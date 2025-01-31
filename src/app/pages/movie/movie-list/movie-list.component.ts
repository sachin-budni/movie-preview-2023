import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  routeName: any = 'popular';
  $movieList: Observable<any> = of();
  queryparamSubscription: Subscription | undefined;
  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): any {
    this.routeName = ((this.route.data as any).getValue().title) as any;
    const name = ((this.route.data as any).getValue().name) as any;
    this.movieService.setTitle(name);
    this.queryparamSubscription = this.route.queryParams.subscribe((params: any) => {
      if (params.page || params.language) {
        this.pageChange(params);
      } else {
        this.router.navigate([`movie/${this.routeName}`], { queryParams: { page: 1 } });
      }
    });
  }

  nextOrPreviousPage(d: any): void {
    const param = typeof d === 'number' ? { page: d } : d;
    this.router.navigate([`movie/${this.routeName}`], { queryParams: param });
  }

  pageChange(params: any): any {
    const Obj = this.movieService.convertLanguageObj(params);
    this.switchMovieList(Obj);
  }
  switchMovieList(Obj: any): void {
    switch (this.routeName) {
      case 'top-rated':
        this.$movieList = this.movieService.getList('movie', 'top_rated', Obj);
        break;
      case 'now-playing':
        this.$movieList = this.movieService.getList('movie', 'now_playing', Obj);
        break;
      default:
        this.$movieList = this.movieService.getList('movie', this.routeName, Obj);
        break;
    }
  }
  ngOnDestroy() {
    this.queryparamSubscription?.unsubscribe();
  }
}

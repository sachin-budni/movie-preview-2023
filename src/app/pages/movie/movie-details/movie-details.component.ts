import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MovieService } from '../../../service/movie.service';
import { Observable, of, Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoComponent } from 'src/app/components/video/video.component';
import { MatDialog } from '@angular/material/dialog';
import { getRouteName } from 'src/app/utils/utils';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss'],
    standalone: false
})
export class MovieDetailsComponent implements OnInit {

  $movieDetails: Observable<any> = of();
  $video: Observable<any> = of();
  $similarMovies: Observable<any> = of();
  $movieReview: Observable<any> = of();
  $translations: Observable<any> = of();
  $cast: Observable<any> = of();
  routeName: any = 'popular';
  type: string = 'movie';
  id: number = 0;
  routerSubscription: Subscription | undefined;
  router = inject(Router);
  constructor(private route: ActivatedRoute,

    private movie: MovieService,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog) { }

  ngOnInit(): any {
    this.routerSubscription = this.route.params
    .subscribe((s: any) => {
      this.id = s.id;
      this.$movieDetails = this.movie.getDetails(this.id, this.type);
      this.$similarMovies = this.movie.similar(this.id, 1, this.type);
      this.$movieReview = this.movie.moviesReviews(this.id, 1);
      // this.$translations = this.movie.translations(this.id);
      // this.$translations.subscribe(console.log)
      this.routeName = getRouteName(this.router.url);
      this.$cast = this.movie.getMovieCast(this.id);
      this.setTitle();
    });
  }

  async setTitle(): Promise<void> {
    const result = await this.movie.getDetails(this.id, this.type).toPromise();
    this.movie.setTitle(result.title);
    this.movie.setMetaData(result);
  }
  nextOrPreviousPage(e: any): void {
    this.$similarMovies = this.movie.similar(this.id, e, this.type);
  }

  playTrailer(video: any) {
    let dialogRef = this.dialog.open(VideoComponent, {
      width: '800px',
      data: {video},
      panelClass: 'video-dailog'
    });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }
}

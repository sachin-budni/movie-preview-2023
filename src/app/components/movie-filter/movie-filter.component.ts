import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.scss']
})
export class MovieFilterComponent implements OnInit {
  filteredOptions: Observable<any> = of();
  searchForm: FormGroup = this.fb.group({ movie: [] });
  activetedRouterName: string = "";
  constructor(private movie: MovieService,
              private fb: FormBuilder,
              private router: Router) {
              }

  ngOnInit(): void {
    this.searchForm.controls['movie'].valueChanges.subscribe((movie: string) => {
      if (movie && movie.length !== 0) {
        const name = window.location.pathname.split('/')[1];
        const routeName = name === 'people' ? 'person' : name;
        this.filteredOptions = this.movie.searchMovieName(movie, routeName).pipe(
          map((movies: any) => movies.results)
        );
      }
    });
  }

  ActivetedRouter(event: any): void {
    this.searchForm.controls['movie'].setValue('');
    this.activetedRouterName = event;
  }

  onSubmitMovieSearch(movie: any): void {
    const route = this.currentRoute;
    if (movie && typeof movie !== 'string') {
      this.router.navigate(['/'+route+'/popular', movie.movie.id ]);
    }
  }

  getLang(lng: any): any {
    return this.movie.languages.filter((l: any) => l.iso_639_1 === lng).map((l: any) => l.english_name);
  }

  get currentRoute() {
    const name = window.location.pathname.split('/')[1];
    return name;
  }

  displayFn(value: any): any {
    const name = value && (value.name) ? value.name : undefined;
    const title = value && (value.title) ? value.title : value;
    const originalTitle = value && value.original_title ? value.original_title : value;
    if (originalTitle) {
      return name || (originalTitle + ' | ' + title);
    }
    return name || title;
  }

}

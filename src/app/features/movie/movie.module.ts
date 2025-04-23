import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { LatestMoviesComponent } from './latest-movies/latest-movies.component';
import { UserMaterialModule } from 'src/app/shared/components/user-material.module';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { CardMovieTvComponent } from 'src/app/shared/components/card-movie-tv/card-movie-tv.component';

@NgModule({
  declarations: [
    MovieListComponent,
    LatestMoviesComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    UserMaterialModule,
    CardComponent,
    PaginationComponent,
    CardMovieTvComponent
  ],
  providers: []
})
export class MovieModule { }

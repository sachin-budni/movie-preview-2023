import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieComponent } from './movie/movie.component';
import { LatestMoviesComponent } from './latest-movies/latest-movies.component';
import { MovieLayoutComponent } from './movie-layout/movie-layout.component';
import { UserMaterialModule } from 'src/app/components/user-material.module';
import { TrendingChartComponent } from 'src/app/components/trending-chart/trending-chart.component';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    MovieComponent,
    TrendingChartComponent,
    LatestMoviesComponent,
    MovieLayoutComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    UserMaterialModule
  ],
  providers: []
})
export class MovieModule { }

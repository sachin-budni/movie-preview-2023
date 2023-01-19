import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieComponent } from './movie/movie.component';
import { TrendingChartComponent } from './trending-chart/trending-chart.component';
import { LatestMoviesComponent } from './latest-movies/latest-movies.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
// import { VideoPipe } from 'src/app/pipes/video.pipe';
import { MovieLayoutComponent } from './movie-layout/movie-layout.component';
import { UserMaterialModule } from 'src/app/components/user-material.module';

const MATERIAL_MODULE = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatExpansionModule
];

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
    MATERIAL_MODULE,
    UserMaterialModule
  ],
  providers: []
})
export class MovieModule { }

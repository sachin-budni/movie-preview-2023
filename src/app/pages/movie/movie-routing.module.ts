import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { LatestMoviesComponent } from './latest-movies/latest-movies.component';
const routes: Routes = [
      { path: 'trendingchart', loadComponent: () => import('./../../components/trending-chart/trending-chart.component')
        .then(c => c.TrendingChartComponent), data: { title: 'trendingchart', name: 'Trending Chart of Movie' } },
      { path: 'popular', component: MovieListComponent, data: { title: 'popular', name: 'Popular Movies' } },
      { path: 'discover', component: MovieListComponent, data: { title: 'discover', name: 'Discover Movies' } },
      { path: 'upcoming', component: MovieListComponent, data: { title: 'upcoming', name: 'Upcoming Movies' } },
      { path: 'latest', component: LatestMoviesComponent, data: { title: 'latest', name: 'Latest Movies' } },
      { path: 'top-rated', component: MovieListComponent, data: { title: 'top-rated', name: 'Top-rated Movies' } },
      { path: 'now-playing', component: MovieListComponent, data: { title: 'now-playing', name: 'Now-playing Movies' } },
      { path: 'popular/:id', loadComponent: () => import('./../../components/details/details.component').then(c => c.DetailsComponent), data: { type: 'movie' } },
      { path: 'upcoming/:id', loadComponent: () => import('./../../components/details/details.component').then(c => c.DetailsComponent), data: { type: 'movie' } },
      { path: 'top-rated/:id', loadComponent: () => import('./../../components/details/details.component').then(c => c.DetailsComponent), data: { type: 'movie' } },
      { path: 'now-playing/:id', loadComponent: () => import('./../../components/details/details.component').then(c => c.DetailsComponent), data: { type: 'movie' } },
      { path: '', redirectTo: 'popular', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MovieRoutingModule { }

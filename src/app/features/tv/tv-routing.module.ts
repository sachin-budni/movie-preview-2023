import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TvListComponent } from './tv-list/tv-list.component';
import { LatestComponent } from './latest/latest.component';
const routes: Routes = [
  { path: 'trendingchart', loadComponent: () => import('../../shared/components/trending-chart/trending-chart.component')
    .then(c => c.TrendingChartComponent) , data: { title: 'trendingchart', name: 'Trending Chart of TV' } },
  { path: 'popular', component: TvListComponent, data: { title: 'popular', name: 'Popular Tv-show' } },
  { path: 'discover', component: TvListComponent, data: { title: 'discover', name: 'Discover Movies' } },
  { path: 'upcoming', component: TvListComponent, data: { title: 'upcoming', name: 'Upcoming Tv-show' } },
  { path: 'latest', component: LatestComponent, data: { title: 'latest', name: 'Latest Tv-show' } },
  { path: 'top-rated', component: TvListComponent, data: { title: 'top-rated', name: 'Top-rated Tv-show' } },
  { path: 'now-playing', component: TvListComponent, data: { title: 'now-playing', name: 'Now-playing Tv-show' } },

  // { path: 'popular/:id', component: DetailsComponent },
  // { path: 'upcoming/:id', component: DetailsComponent },
  // { path: 'top-rated/:id', component: DetailsComponent },
  // { path: 'now-playing/:id', component: DetailsComponent },
  { path: 'popular/:id', loadComponent: () => import('../../shared/components/details/details.component').then(c => c.DetailsComponent), data: { type: 'tv' } },
  { path: 'upcoming/:id', loadComponent: () => import('../../shared/components/details/details.component').then(c => c.DetailsComponent), data: { type: 'tv' } },
  { path: 'top-rated/:id', loadComponent: () => import('../../shared/components/details/details.component').then(c => c.DetailsComponent), data: { type: 'tv' } },
  { path: 'now-playing/:id', loadComponent: () => import('../../shared/components/details/details.component').then(c => c.DetailsComponent), data: { type: 'tv' } },

  { path: '', redirectTo: 'popular', pathMatch: 'full' },
  { path: '**', redirectTo: 'popular', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TvRoutingModule { }

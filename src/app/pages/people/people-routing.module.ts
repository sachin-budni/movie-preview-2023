import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { DetailsComponent } from './details/details.component';

// const routes: Routes = [
//   { path: 'people', component: PeopleListComponent }
// ]
const routes: Routes = [
  { path: 'trendingchart', loadComponent: () => import('./../../components/trending-chart/trending-chart.component')
    .then(c => c.TrendingChartComponent), data: { title: 'trendingchart', name: 'Trending Chart of People' } },
  { path: 'popular', component: PeopleListComponent, data: { title: 'popular', name: 'Popular Tv-show' } },

  { path: 'popular/:id', component: DetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }

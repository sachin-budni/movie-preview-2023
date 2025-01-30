import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { UserMaterialModule } from '../components/user-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from '../theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
import { TrendingChartComponent } from '../components/trending-chart/trending-chart.component';
const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'all/trendingchart', component: TrendingChartComponent, data: { title: 'trendingchart', name: 'Trending Chart' } },
    { path: 'tv', loadChildren: () => import('./../pages/tv/tv.module').then(m=> m.TvModule) },
    { path: 'people', loadChildren: () => import('./../pages/people/people.module').then(m=> m.PeopleModule) },
    { path: '', loadChildren: () => import('./../pages/movie/movie.module').then(m=> m.MovieModule) },
  ] }
];

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ThemeModule,
    UserMaterialModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }

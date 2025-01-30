import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { UserMaterialModule } from '../components/user-material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ThemeModule } from '../theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
import { TrendingChartComponent } from '../components/trending-chart/trending-chart.component';
import { MovieService } from '../service/movie.service';
import { MovieApiInterceptor } from '../service/api.interceptor';
import { ThemeService } from '../theme/theme.service';
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
  providers: [
    MovieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MovieApiInterceptor,
      multi: true
    },
    ThemeService
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }

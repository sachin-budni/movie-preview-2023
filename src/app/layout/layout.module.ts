import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { UserMaterialModule } from '../shared/components/user-material.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MovieService } from '../core/service/movie.service';
import { movieApiInterceptor } from '../core/interceptors/api.interceptor';
import { LanguageFilterComponent } from '../shared/components/language-filter/language-filter.component';
import { MovieFilterComponent } from '../shared/components/movie-filter/movie-filter.component';
import { ThemeDirective } from '../shared/theme/theme.directive';
import { BehaviorSubject, Observable } from 'rxjs';
import { ErrorService } from '../core/service/error.service';
const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'all/trendingchart', loadComponent: () => import('../shared/components/trending-chart/trending-chart.component')
      .then(c => c.TrendingChartComponent) , data: { title: 'trendingchart', name: 'Trending Chart' } },
    { path: 'tv', loadChildren: () => import('./../features/tv/tv.module').then(m=> m.TvModule) },
    { path: 'people', loadChildren: () => import('./../features/people/people.module').then(m=> m.PeopleModule) },
    { path: 'movie', loadChildren: () => import('./../features/movie/movie.module').then(m=> m.MovieModule) },
    { path: '', redirectTo: 'movie',pathMatch: 'full' },
    { path: '**', loadComponent: () => import('../shared/components/page-not-found.component')
      .then(c => c.PageNotFoundComponent)
     }
  ] },
];
export interface ThemeConfig {
  getActiveTheme: () => Observable<string>;
  setActiveThem: (name: string) => void
}
export const THEME_SERVICE = new InjectionToken<ThemeConfig>('sample');
@NgModule({ declarations: [
        LayoutComponent
    ],
    exports: [
        LayoutComponent
    ], imports: [CommonModule,
        RouterModule.forChild(routes),
        UserMaterialModule,
        LanguageFilterComponent,
        MovieFilterComponent,
        ThemeDirective], providers: [
        MovieService,
        ErrorService,
        {
            provide: THEME_SERVICE,
            useFactory: themeService,
            deps: []
        },
        provideHttpClient(withInterceptors([movieApiInterceptor]))
    ] })
export class LayoutModule { }


function themeService() {
  let activeThem = new BehaviorSubject('dark');
  let getActiveTheme = () : Observable<string> => activeThem.asObservable();
  let setActiveThem = (name: any): void => activeThem.next(name);
  return { getActiveTheme, setActiveThem };
}


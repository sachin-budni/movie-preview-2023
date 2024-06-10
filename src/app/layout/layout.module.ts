import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserMaterialModule } from '../components/user-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ThemeModule } from '../theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
import { TrendingChartComponent } from '../components/trending-chart/trending-chart.component';
const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: 'all/trendingchart', component: TrendingChartComponent },
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

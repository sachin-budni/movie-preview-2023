import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendingChartComponent } from './components/trending-chart/trending-chart.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./layout/layout.module').then(m=> m.LayoutModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

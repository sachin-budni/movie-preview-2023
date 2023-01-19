import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'tv', loadChildren: () => import('./pages/tv/tv.module').then(m=> m.TvModule) },
  { path: 'people', loadChildren: () => import('./pages/people/people.module').then(m=> m.PeopleModule) },
  { path: '', loadChildren: () => import('./pages/movie/movie.module').then(m=> m.MovieModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

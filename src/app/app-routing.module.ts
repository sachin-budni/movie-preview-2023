import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withComponentInputBinding } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./layout/layout.module').then(m=> m.LayoutModule) }
];

@NgModule({
  imports: [],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule { }

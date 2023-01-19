import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from './theme.directive';

@NgModule({
  declarations: [ThemeDirective],
  exports: [ThemeDirective],
  imports: [
    CommonModule
  ]
})
export class ThemeModule { }

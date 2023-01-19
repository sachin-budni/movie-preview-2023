import { Directive, ElementRef, Inject, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from './theme.service';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnInit, OnDestroy {

  private themeName = 'dark';
  private themServiceSubscription: Subscription = new Subscription();
  constructor(private elementRef: ElementRef,
              @Inject(DOCUMENT) private document: Document,
              private themService: ThemeService) { }

  ngOnInit(): void {
    this.updateTheme(this.themeName);
    this.themService.getActiveTheme()
      .subscribe(themeName => {
        this.themeName = themeName;
        this.updateTheme(this.themeName);
      });
  }

  updateTheme(themeName: any): void {
    const element:HTMLElement = this.document.body;
    const theme = themeName === 'dark' ? 'light' : 'dark'
    element.classList.add(themeName);
    element.classList.remove(theme);
  }

  ngOnDestroy(): void {
    if (this.themServiceSubscription) {
      this.themServiceSubscription.unsubscribe();
    }
  }

}

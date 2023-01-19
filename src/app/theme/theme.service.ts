import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ThemeService {
  private activeThem = new BehaviorSubject('dark');
  constructor() { }

  public getActiveTheme(): Observable<string> {
    return this.activeThem.asObservable();
  }

  public setActiveThem(name: any): void {
    this.activeThem.next(name);
  }
}

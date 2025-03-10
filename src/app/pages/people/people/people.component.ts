import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss'],
    standalone: false
})
export class PeopleComponent {
  @Input('Movies') $Movies: Observable<any> = of({});
  @Input('MovieClassName') $nameOfRoute: Observable<any> = of();
  @Output() pages = new EventEmitter<any>();
  route = inject(ActivatedRoute);

  pageChange(d: number): any {
    const params: any = this.route.snapshot.queryParams;
    if (params.language) {
      this.pages.emit({
        language: params.language,
        page: d
      });
    } else {
      this.pages.emit(d);
    }
  }
}

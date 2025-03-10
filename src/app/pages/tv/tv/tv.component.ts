import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Response_Data, ROUTE_LIST } from 'src/app/models/common-models';

@Component({
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrls: ['./tv.component.scss'],
    standalone: false
})
export class TvComponent {
  @Input('Movies') $Movies: Observable<Response_Data> = of();
  @Input('MovieClassName') $nameOfRoute: ROUTE_LIST | null = null;
  @Output() pages = new EventEmitter<any>();
  private route = inject(ActivatedRoute);

  pageChange(d: number): void {
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

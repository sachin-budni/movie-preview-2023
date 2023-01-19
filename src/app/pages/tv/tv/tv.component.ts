import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('Movies') $Movies: Observable<any> = of({});
  // tslint:disable-next-line:no-input-rename
  @Input('MovieClassName') $nameOfRoute: Observable<any> = of();
  @Output() pages = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): any {
  }

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

import { Component, OnInit, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { MovieService } from '../../../service/movie.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('Movies') $Movies: Observable<any> = of();
  // tslint:disable-next-line: no-input-rename
  @Input('MovieClassName') $nameOfRoute: Observable<any> = of();
  @Output() pages = new EventEmitter<any>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  pageChange(d: number): any {
    const params: any = this.route.snapshot.queryParams;
    if (params.language) {
      this.pages.emit({ language: params.language, page: d });
    } else {
      this.pages.emit(d);
    }
  }

}

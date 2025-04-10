import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ROUTE_LIST, Response_Data, UrlQueryParam } from 'src/app/models/common-models';
import { PaginationComponent } from '../pagination/pagination.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-movie-tv',
  imports: [RouterModule, CommonModule, PaginationComponent, CardComponent],
  templateUrl: './card-movie-tv.component.html',
  styleUrl: './card-movie-tv.component.scss'
})
export class CardMovieTvComponent {
  _routerName: ROUTE_LIST = 'popular'
    @Input('Movies') $Movies: Observable<Response_Data> = of();
    @Input('type') type: string = 'movie';
  
    @Input('MovieClassName') set $nameOfRoute(value: ROUTE_LIST) {
      this._routerName = value !== 'discover' ? value : 'popular';
    };
    @Output() pages = new EventEmitter<UrlQueryParam | number>();
  
    get getRouterName(): ROUTE_LIST {
      return this._routerName;
    }
  
    constructor(private route: ActivatedRoute) { }
  
    pageChange(d: any): any {
      const params: UrlQueryParam = this.route.snapshot.queryParams;
      if (params.language) {
        this.pages.emit({ language: params.language, page: d });
      } else {
        this.pages.emit(d);
      }
    }
}

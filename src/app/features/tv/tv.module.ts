import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvListComponent } from './tv-list/tv-list.component';
import { TvRoutingModule } from './tv-routing.module';
import { LatestComponent } from './latest/latest.component';
import { UserMaterialModule } from 'src/app/shared/components/user-material.module';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { CardMovieTvComponent } from 'src/app/shared/components/card-movie-tv/card-movie-tv.component';


@NgModule({
  declarations: [TvListComponent, LatestComponent],
  imports: [
    CommonModule,
    TvRoutingModule,
    UserMaterialModule,
    CardComponent,
    PaginationComponent,
    CardMovieTvComponent
  ]
})
export class TvModule { }

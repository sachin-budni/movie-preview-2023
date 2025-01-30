import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvListComponent } from './tv-list/tv-list.component';
import { TvRoutingModule } from './tv-routing.module';
import { TvComponent } from './tv/tv.component';
import { DetailsComponent } from './details/details.component';
import { LatestComponent } from './latest/latest.component';
import { UserMaterialModule } from 'src/app/components/user-material.module';


@NgModule({
  declarations: [TvListComponent, TvComponent, DetailsComponent, LatestComponent],
  imports: [
    CommonModule,
    TvRoutingModule,
    UserMaterialModule
  ]
})
export class TvModule { }

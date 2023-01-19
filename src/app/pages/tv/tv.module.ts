import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvListComponent } from './tv-list/tv-list.component';
import { TvRoutingModule } from './tv-routing.module';
import { TvComponent } from './tv/tv.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailsComponent } from './details/details.component';
import { LatestComponent } from './latest/latest.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserMaterialModule } from 'src/app/components/user-material.module';
const MATERIAL_MODULE = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatDialogModule
];


@NgModule({
  declarations: [TvListComponent, TvComponent, DetailsComponent, LatestComponent],
  imports: [
    CommonModule,
    TvRoutingModule,
    MATERIAL_MODULE,
    UserMaterialModule
  ]
})
export class TvModule { }

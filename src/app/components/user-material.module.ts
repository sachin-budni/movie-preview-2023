import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { VideoPipe } from '../pipes/video.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from './card/card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RegionFilterComponent } from './region-filter/region-filter.component';
import { LanguageFilterComponent } from './language-filter/language-filter.component';
import { MovieFilterComponent } from './movie-filter/movie-filter.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


const ANGULAR_MATERIAL = [
  MatDialogModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule
]

@NgModule({
  declarations: [
    VideoComponent,
    VideoPipe,
    CardComponent,
    RegionFilterComponent,
    LanguageFilterComponent,
    MovieFilterComponent
  ],
  imports: [
    CommonModule,
    ANGULAR_MATERIAL,
    ReactiveFormsModule
  ],
  exports: [
    CardComponent,
    VideoComponent,
    VideoPipe,
    RegionFilterComponent,
    LanguageFilterComponent,
    MovieFilterComponent
  ]
})
export class UserMaterialModule { }

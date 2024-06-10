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
// import { TrendingChartComponent } from './trending-chart/trending-chart.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


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
  declarations: [
    VideoComponent,
    VideoPipe,
    CardComponent,
    RegionFilterComponent,
    LanguageFilterComponent,
    MovieFilterComponent,
  ],
  imports: [
    CommonModule,
    MATERIAL_MODULE,
    ReactiveFormsModule
  ],
  exports: [
    CardComponent,
    VideoComponent,
    VideoPipe,
    RegionFilterComponent,
    LanguageFilterComponent,
    MovieFilterComponent,
    MATERIAL_MODULE,
  ]
})
export class UserMaterialModule { }

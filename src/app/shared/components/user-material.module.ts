import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPipe } from '../pipes/video.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';


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
  MatDialogModule,
  MatSnackBarModule,
  MatTabsModule,
  MatChipsModule
];

@NgModule({
  declarations: [
    VideoPipe,
  ],
  imports: [
    CommonModule,
    MATERIAL_MODULE,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    VideoPipe,
    MATERIAL_MODULE,
  ]
})
export class UserMaterialModule { }

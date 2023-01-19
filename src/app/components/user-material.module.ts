import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { VideoPipe } from '../pipes/video.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from './card/card.component';
import { MatTooltipModule } from '@angular/material/tooltip';


const ANGULAR_MATERIAL = [
  MatDialogModule,
  MatTooltipModule
]

@NgModule({
  declarations: [
    VideoComponent,
    VideoPipe,
    CardComponent
  ],
  imports: [
    CommonModule,
    ANGULAR_MATERIAL
  ],
  exports: [
    CardComponent,
    VideoComponent,
    VideoPipe
  ]
})
export class UserMaterialModule { }

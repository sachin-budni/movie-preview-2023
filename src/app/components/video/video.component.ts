import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(data)
  }

  ngOnInit(): void {
  }

}

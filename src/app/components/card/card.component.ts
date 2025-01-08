import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() credits: any = undefined;
  @Input() link: any = undefined;
  ngOnInit(): void {
  }
}

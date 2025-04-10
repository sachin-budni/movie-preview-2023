import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-pagination',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() Movies: any = null;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>()

  pageChange(page: number) {
    this.changePage.emit(page);
  }
}

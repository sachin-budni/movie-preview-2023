import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMovieTvComponent } from './card-movie-tv.component';

describe('CardMovieTvComponent', () => {
  let component: CardMovieTvComponent;
  let fixture: ComponentFixture<CardMovieTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMovieTvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMovieTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

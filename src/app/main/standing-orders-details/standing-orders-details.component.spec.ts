import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingOrdersDetailsComponent } from './standing-orders-details.component';

describe('StandingOrdersDetailsComponent', () => {
  let component: StandingOrdersDetailsComponent;
  let fixture: ComponentFixture<StandingOrdersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingOrdersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

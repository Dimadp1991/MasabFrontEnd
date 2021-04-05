import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBillsDetailsComponent } from './customer-bills-details.component';

describe('CustomerBillsDetailsComponent', () => {
  let component: CustomerBillsDetailsComponent;
  let fixture: ComponentFixture<CustomerBillsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBillsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBillsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

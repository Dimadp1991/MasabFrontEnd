import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBillsListComponent } from './customer-bills-list.component';

describe('CustomerBillsListComponent', () => {
  let component: CustomerBillsListComponent;
  let fixture: ComponentFixture<CustomerBillsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBillsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBillsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

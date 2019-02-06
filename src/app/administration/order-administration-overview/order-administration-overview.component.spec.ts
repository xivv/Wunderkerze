import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAdministrationOverviewComponent } from './order-administration-overview.component';

describe('OrderAdministrationOverviewComponent', () => {
  let component: OrderAdministrationOverviewComponent;
  let fixture: ComponentFixture<OrderAdministrationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAdministrationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAdministrationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

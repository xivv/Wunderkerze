import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchandiseViewComponent } from './merchandise-view.component';

describe('MerchandiseViewComponent', () => {
  let component: MerchandiseViewComponent;
  let fixture: ComponentFixture<MerchandiseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchandiseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchandiseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

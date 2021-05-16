import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdjustmentComponent } from './add-adjustment.component';

describe('AddAdjustmentComponent', () => {
  let component: AddAdjustmentComponent;
  let fixture: ComponentFixture<AddAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

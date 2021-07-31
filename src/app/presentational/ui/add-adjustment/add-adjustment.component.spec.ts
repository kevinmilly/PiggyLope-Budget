import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddAdjustmentComponent } from './add-adjustment.component';

describe('AddAdjustmentComponent', () => {
  let component: AddAdjustmentComponent;
  let fixture: ComponentFixture<AddAdjustmentComponent>;

  beforeEach(waitForAsync(() => {
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

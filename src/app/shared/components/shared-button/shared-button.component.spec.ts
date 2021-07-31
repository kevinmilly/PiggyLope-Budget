import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SharedButtonComponent } from './shared-button.component';

describe('SharedButtonComponent', () => {
  let component: SharedButtonComponent;
  let fixture: ComponentFixture<SharedButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

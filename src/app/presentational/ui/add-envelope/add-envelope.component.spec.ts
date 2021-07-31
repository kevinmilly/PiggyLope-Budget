import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddEnvelopeComponent } from './add-envelope.component';

describe('AddEnvelopeComponent', () => {
  let component: AddEnvelopeComponent;
  let fixture: ComponentFixture<AddEnvelopeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEnvelopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEnvelopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

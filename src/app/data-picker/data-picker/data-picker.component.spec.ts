import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPickerComponent } from './data-picker.component';

describe('DataPickerComponent', () => {
  let component: DataPickerComponent;
  let fixture: ComponentFixture<DataPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleUseComponent } from './simple-use.component';

describe('SimpleUseComponent', () => {
  let component: SimpleUseComponent;
  let fixture: ComponentFixture<SimpleUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

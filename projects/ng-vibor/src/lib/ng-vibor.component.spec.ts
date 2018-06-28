import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgViborComponent } from './ng-vibor.component';

describe('NgViborComponent', () => {
  let component: NgViborComponent;
  let fixture: ComponentFixture<NgViborComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgViborComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgViborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

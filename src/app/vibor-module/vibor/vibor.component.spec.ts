import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViborComponent } from './vibor.component';

describe('ViborComponent', () => {
  let component: ViborComponent;
  let fixture: ComponentFixture<ViborComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViborComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

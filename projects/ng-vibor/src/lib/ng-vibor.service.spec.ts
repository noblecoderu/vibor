import { TestBed, inject } from '@angular/core/testing';

import { NgViborService } from './ng-vibor.service';

describe('NgViborService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgViborService]
    });
  });

  it('should be created', inject([NgViborService], (service: NgViborService) => {
    expect(service).toBeTruthy();
  }));
});

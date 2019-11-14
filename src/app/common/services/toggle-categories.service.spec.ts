import { TestBed } from '@angular/core/testing';

import { ToggleCategoriesService } from './toggle-categories.service';

describe('ToggleCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToggleCategoriesService = TestBed.get(ToggleCategoriesService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ShowCartItemsService } from './show-cart-items.service';

describe('ShowCartItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowCartItemsService = TestBed.get(ShowCartItemsService);
    expect(service).toBeTruthy();
  });
});

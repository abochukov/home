import { TestBed } from '@angular/core/testing';

import { AddCartItemsFromDetailsService } from './add-cart-items-from-details.service';

describe('AddCartItemsFromDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddCartItemsFromDetailsService = TestBed.get(AddCartItemsFromDetailsService);
    expect(service).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTotalItemsComponent } from './cart-total-items.component';

describe('CartTotalItemsComponent', () => {
  let component: CartTotalItemsComponent;
  let fixture: ComponentFixture<CartTotalItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartTotalItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTotalItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

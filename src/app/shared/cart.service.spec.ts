import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { Game } from '../games/shared/game.model';

const FOO: Game = {
  id: 1,
  name: 'Foo',
  price: 2,
  discount: '',
  imgSrc: '',
};

const BAR: Game = {
  id: 2,
  name: 'Bar',
  price: 3,
  discount: '',
  imgSrc: '',
};

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CartService] });
    service = TestBed.inject(CartService);
  });

  it('should add game to the cart', () => {
    service.add(FOO);

    expect(service.cart()).toEqual([FOO]);
  });

  it('should not allow adding the same game again', () => {
    service.add(FOO);
    service.add(BAR);

    expect(service.count()).toBe(2);

    service.add(FOO);

    expect(service.count()).toBe(2);
  });

  it('should remove game from the cart by id', () => {
    service.add(BAR);

    expect(service.cart()).toEqual([BAR]);

    service.remove(BAR.id);

    expect(service.cart()).toEqual([]);
  });

  it('should compute total cart cost', () => {
    service.add(FOO);
    service.add(BAR);

    expect(service.total()).toBe(5);
  });
});

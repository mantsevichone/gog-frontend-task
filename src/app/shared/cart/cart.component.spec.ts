import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartService } from '../cart.service';
import { Game } from '../../games/shared/game.model';

const fooGame: Game = {
  id: 1,
  name: 'Foo',
  price: 5,
  discount: '',
  imgSrc: '',
};
const barGame: Game = {
  id: 2,
  name: 'Bar',
  price: 9,
  discount: '',
  imgSrc: '',
};

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let element: HTMLElement;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should open dropdown by click', () => {
    expect(element.querySelector('.cart-dropdown')).toBeFalsy();

    element.querySelector('button')?.click();
    fixture.detectChanges();

    expect(element.querySelector('.cart-dropdown')).toBeTruthy();
  });

  it('should show a placeholder while empty', () => {
    component.isCartOpen.set(true);
    fixture.detectChanges();

    expect(element.querySelector('.cart-btn')?.textContent).toMatch('0');

    const dropdown = element.querySelector('.cart-dropdown');

    expect(dropdown?.childElementCount).toBe(1);
    expect(dropdown?.firstElementChild?.textContent).toBe('Your cart is empty');
  });

  it('should show cart details', () => {
    component.isCartOpen.set(true);
    cartService.add(fooGame);
    cartService.add(barGame);
    fixture.detectChanges();

    expect(element.querySelector('.cart-btn')?.textContent).toMatch('2');

    const cartHeader = element.querySelector('.cart-header');

    const [title, total] = Array.from(
      cartHeader?.querySelectorAll('strong') ?? []
    );

    expect(title?.textContent).toBe('2 items in cart'.toUpperCase());
    expect(total?.textContent).toBe('$14.00');

    expect(element.querySelectorAll('.cart-game')).toHaveSize(2);
  });

  it('should react to cart item removal', () => {
    component.isCartOpen.set(true);
    cartService.add(fooGame);
    cartService.add(barGame);
    fixture.detectChanges();

    const fooInCart = element.querySelectorAll('.cart-game')[0];

    fooInCart?.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    fooInCart.querySelector('button')?.click();
    fixture.detectChanges();

    expect(element.querySelector('.cart-btn')?.textContent).toMatch('1');

    const cartHeader = element.querySelector('.cart-header');

    const [title, total] = Array.from(
      cartHeader?.querySelectorAll('strong') ?? []
    );

    expect(title?.textContent).toBe('1 item in cart'.toUpperCase());
    expect(total?.textContent).toBe('$9.00');

    expect(element.querySelectorAll('.cart-game')).toHaveSize(1);
  });

  it('should react to cart cleanup', () => {
    component.isCartOpen.set(true);
    cartService.add(fooGame);
    cartService.add(barGame);
    fixture.detectChanges();

    const cartHeader = element.querySelector('.cart-header');
    cartHeader?.querySelector('button')?.click();
    fixture.detectChanges();

    expect(element.querySelector('.cart-btn')?.textContent).toMatch('0');

    const dropdown = element.querySelector('.cart-dropdown');

    expect(dropdown?.childElementCount).toBe(1);
    expect(dropdown?.firstElementChild?.textContent).toBe('Your cart is empty');
  });
});

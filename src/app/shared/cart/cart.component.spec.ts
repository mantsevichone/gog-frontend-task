import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayModule, OverlayContainer } from '@angular/cdk/overlay';

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
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent, OverlayModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    cartService = TestBed.inject(CartService);
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();
    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should open dropdown by click', () => {
    expect(overlayContainerElement.querySelector('.cart-dropdown')).toBeFalsy();

    element.querySelector('button')?.click();
    fixture.detectChanges();

    expect(
      overlayContainerElement.querySelector('.cart-dropdown')
    ).toBeTruthy();
  });

  it('should close dropdown by click outside', () => {
    element.querySelector('button')?.click();
    fixture.detectChanges();

    expect(
      overlayContainerElement.querySelector('.cart-dropdown')
    ).toBeTruthy();

    document.body.click();
    fixture.detectChanges();

    expect(overlayContainerElement.querySelector('.cart-dropdown')).toBeFalsy();
  });

  it('should show a placeholder while empty', () => {
    component.isCartOpen = true;
    fixture.detectChanges();

    expect(element.querySelector('.cart-btn')?.textContent).toMatch('0');

    const dropdown = overlayContainerElement.querySelector('.cart-dropdown');

    expect(dropdown?.childElementCount).toBe(2);
    expect(dropdown?.lastElementChild?.textContent).toBe('Your cart is empty');
  });

  it('should show cart details', () => {
    component.isCartOpen = true;
    cartService.add(fooGame);
    cartService.add(barGame);
    fixture.detectChanges();

    expect(element.querySelector('.cart-btn')?.textContent).toMatch('2');

    const cartHeader = overlayContainerElement.querySelector('.cart-header');

    const [title, total] = Array.from(
      cartHeader?.querySelectorAll('strong') ?? []
    );

    expect(title?.textContent).toBe('2 items in cart'.toUpperCase());
    expect(total?.textContent).toBe('$14.00');

    expect(overlayContainerElement.querySelectorAll('.cart-game')).toHaveSize(
      2
    );
  });

  it('should react to cart item removal', () => {
    component.isCartOpen = true;
    cartService.add(fooGame);
    cartService.add(barGame);
    fixture.detectChanges();

    const fooInCart = overlayContainerElement.querySelectorAll('.cart-game')[0];

    fooInCart?.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    fooInCart.querySelector('button')?.click();
    fixture.detectChanges();

    expect(element.querySelector('.cart-btn')?.textContent).toMatch('1');

    const cartHeader = overlayContainerElement.querySelector('.cart-header');

    const [title, total] = Array.from(
      cartHeader?.querySelectorAll('strong') ?? []
    );

    expect(title?.textContent).toBe('1 item in cart'.toUpperCase());
    expect(total?.textContent).toBe('$9.00');

    expect(overlayContainerElement.querySelectorAll('.cart-game')).toHaveSize(
      1
    );
  });

  it('should react to cart cleanup', () => {
    component.isCartOpen = true;
    cartService.add(fooGame);
    cartService.add(barGame);
    fixture.detectChanges();

    const cartHeader = overlayContainerElement.querySelector('.cart-header');
    cartHeader?.querySelector('button')?.click();
    fixture.detectChanges();

    expect(element.querySelector('.cart-btn')?.textContent).toMatch('0');

    const dropdown = overlayContainerElement.querySelector('.cart-dropdown');

    expect(dropdown?.childElementCount).toBe(2);
    expect(dropdown?.lastElementChild?.textContent).toBe('Your cart is empty');
  });
});

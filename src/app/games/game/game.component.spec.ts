import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { GameComponent } from './game.component';
import { Game } from '../shared/game.model';

@Component({
  imports: [GameComponent],
  template: `<app-game
    [game]="game"
    [owned]="owned"
    [inCart]="inCart"
    (priceClicked)="onPriceClicked()"
  />`,
})
class TestHostComponent {
  game: Game = {
    id: 1,
    name: 'Foo',
    price: 2,
    discount: '',
    imgSrc: '/test',
  };
  owned = false;
  inCart = false;

  onPriceClicked() {
    this.inCart = true;
  }
}

describe('GameComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    element = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should display a content passed via game input', () => {
    const image = element.querySelector('img[alt="Foo"]');
    expect(image).toBeTruthy();

    const name = element.querySelector('p');
    expect(name?.textContent).toBe('FOO');

    const noDiscount = element.querySelector('span');
    expect(noDiscount).toBeFalsy();

    const price = element.querySelector('button');
    expect(price?.textContent?.trim()).toBe('$2.00');

    testHost.game.discount = '-50%';

    fixture.detectChanges();

    const discount = element.querySelector('span');
    expect(discount?.textContent).toBe('-50%');
  });

  it('should update button based on external state', () => {
    const price = element.querySelector('button');
    expect(price?.textContent?.trim()).toBe('$2.00');

    price?.click();
    fixture.detectChanges();

    expect(element.querySelector('button')?.textContent).toBe('IN CART');

    testHost.owned = true;
    fixture.detectChanges();

    expect(element.querySelector('button')?.textContent).toBe('OWNED');
  });
});

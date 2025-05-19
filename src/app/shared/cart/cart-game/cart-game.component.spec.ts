import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { CartGameComponent } from './cart-game.component';
import { Game } from '../../../games/shared/game.model';

@Component({
  imports: [CartGameComponent],
  template: `
    <app-cart-game [game]="game" (removeClicked)="onRemoveClicked()" />
  `,
})
class TestHostComponent {
  game: Game = {
    id: 1,
    name: 'Foo',
    price: 2,
    discount: '',
    imgSrc: '',
  };
  removed = false;

  onRemoveClicked() {
    this.removed = true;
  }
}

describe('CartGameComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartGameComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should render content passed by game input', () => {
    const image = element.querySelector('img[alt="Foo"]');
    expect(image).toBeTruthy();

    const name = element.querySelector('p');
    expect(name?.textContent).toBe('FOO');

    const price = element.querySelector('span');
    expect(price?.textContent).toBe('$2.00');
  });

  it('should show a remove button on hover', () => {
    const container = element.querySelector('.cart-game');

    container?.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(element.querySelector('button')).toBeTruthy();

    container?.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    expect(element.querySelector('button')).toBeFalsy();
  });

  it('should emit a removeClicked event', () => {
    expect(component.removed).toBeFalse();

    const container = element.querySelector('.cart-game');

    container?.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    element.querySelector('button')?.click();
    fixture.detectChanges();

    expect(component.removed).toBeTrue();
  });
});

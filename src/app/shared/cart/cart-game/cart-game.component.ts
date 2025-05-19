import { Component, input, output } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

import { Game } from '../../../games/shared/game.model';

@Component({
  selector: 'app-cart-game',
  imports: [UpperCasePipe, CurrencyPipe],
  templateUrl: './cart-game.component.html',
  styleUrl: './cart-game.component.css',
})
export class CartGameComponent {
  isRemovable = false; // a flag to simulate a :hover effect to be able to unit-test
  game = input.required<Game>();
  removeClicked = output();
}

import { Component, input, output } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

import { Game } from '../shared/game.model';

@Component({
  selector: 'app-game',
  imports: [UpperCasePipe, CurrencyPipe],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  game = input.required<Game>();
  owned = input(false);
  inCart = input(false);
  priceClicked = output();
}

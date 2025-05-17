import { Component, inject } from '@angular/core';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';

import { Game } from './shared/game.model';
import { GameService } from './shared/game.service';

@Component({
  selector: 'app-games',
  imports: [UpperCasePipe, CurrencyPipe],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent {
  games: Game[] = [];
  gameOfTheWeek: Game | null = null;

  gameService = inject(GameService);

  constructor() {
    this.gameService.getGames().then((games) => (this.games = games));
    this.gameService
      .getGameOfTheWeek()
      .then((game) => (this.gameOfTheWeek = game));
  }
}

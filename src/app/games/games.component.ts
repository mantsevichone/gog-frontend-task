import { Component, inject } from '@angular/core';

import { Game } from './shared/game.model';
import { GameService } from './shared/game.service';
import { CartService } from '../shared/cart.service';
import { GameComponent } from './game/game.component';
import { GameOfWeekComponent } from "./game-of-week/game-of-week.component";

@Component({
  selector: 'app-games',
  imports: [GameComponent, GameOfWeekComponent],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent {
  games: Game[] = [];
  gameOfTheWeek: Game | null = null;
  ownedGameIDs: number[] = [];

  gameService = inject(GameService);
  cartService = inject(CartService);

  constructor() {
    this.gameService.getGames().then((games) => (this.games = games));
    this.gameService
      .getGameOfTheWeek()
      .then((game) => (this.gameOfTheWeek = game));
    this.gameService
      .getOwnedGames()
      .then((gameIDs) => (this.ownedGameIDs = gameIDs));
  }
}

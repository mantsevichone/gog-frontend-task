import { Injectable } from '@angular/core';

import { GAMES } from './mock-games';
import { GAME_OF_THE_WEEK } from './mock-week-game';

@Injectable({ providedIn: 'root' })
export class GameService {
  getGames() {
    return Promise.resolve(GAMES);
  }

  getGameOfTheWeek() {
    return Promise.resolve(GAME_OF_THE_WEEK);
  }
}

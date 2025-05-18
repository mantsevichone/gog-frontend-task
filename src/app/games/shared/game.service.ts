import { Injectable } from '@angular/core';

import { GAMES } from './mock-games';
import { GAME_OF_THE_WEEK } from './mock-week-game';

// In real app it would be read from a user service
const OWNED_GAME_IDS = [2];

@Injectable({ providedIn: 'root' })
export class GameService {
  getGames() {
    return Promise.resolve(GAMES);
  }

  getGameOfTheWeek() {
    return Promise.resolve(GAME_OF_THE_WEEK);
  }

  getOwnedGames() {
    return Promise.resolve(OWNED_GAME_IDS);
  }
}

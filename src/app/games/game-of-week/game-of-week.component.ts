import { Component, input } from '@angular/core';
import { Game } from '../shared/game.model';

@Component({
  selector: 'app-game-of-week',
  imports: [],
  templateUrl: './game-of-week.component.html',
  styleUrl: './game-of-week.component.css'
})
export class GameOfWeekComponent {
  game = input.required<Game>();

  protected showSecret() {
    alert('👀');
  }
}

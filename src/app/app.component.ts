import { Component } from '@angular/core';

import { GamesComponent } from './games/games.component';

@Component({
  selector: 'app-root',
  imports: [GamesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gog-frontend-task';
}

import { Component } from '@angular/core';

import { GamesComponent } from './games/games.component';
import { CartComponent } from './shared/cart/cart.component';

@Component({
  selector: 'app-root',
  imports: [GamesComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gog-frontend-task';
}

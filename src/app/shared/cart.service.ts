import { computed, Injectable, signal } from '@angular/core';
import { Game } from '../games/shared/game.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _cart = signal<Game[]>([]);

  get cart() {
    return this._cart.asReadonly();
  }

  cartIDs = computed(() => this.cart().map((game) => game.id));
  count = computed(() => this.cart().length);
  total = computed(() =>
    this.cart().reduce((sum, game) => sum + game.price, 0)
  );

  add(game: Game) {
    if (this.has(game.id)) {
      return;
    }
    this._cart.update((prev) => prev.concat([game]));
  }

  remove(id: number) {
    this._cart.update((prev) => prev.filter((game) => game.id !== id));
  }

  clear() {
    this._cart.set([]);
  }

  has(id: number): boolean {
    return this.cartIDs().includes(id);
  }
}

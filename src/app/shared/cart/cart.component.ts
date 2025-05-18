import { Component, computed, inject, signal } from '@angular/core';

import { CartService } from '../cart.service';
import { CartGameComponent } from './cart-game/cart-game.component';
import { CartHeaderComponent } from './cart-header/cart-header.component';

@Component({
  selector: 'app-cart',
  imports: [CartGameComponent, CartHeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  isCartOpen = signal(false);

  cartService = inject(CartService);

  cartSizeTitle = computed(() => {
    const singularOrPlural = this.cartService.count() === 1 ? 'item' : 'items';

    return `${this.cartService.count()} ${singularOrPlural} in cart`;
  });

  toggleCartAppearance() {
    this.isCartOpen.update((prev) => !prev);
  }
}

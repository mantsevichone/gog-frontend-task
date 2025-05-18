import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  isCartOpen = signal(false);

  cartService = inject(CartService);

  cartSizeMessage = computed(() => {
    const singularOrPlural = this.cartService.count() === 1 ? 'item' : 'items';

    return `${this.cartService.count()} ${singularOrPlural} in cart`;
  });

  toggleCartAppearance() {
    this.isCartOpen.update((prev) => !prev);
  }
}

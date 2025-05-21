import { Component, computed, inject } from '@angular/core';
import { OverlayModule, ConnectedPosition } from '@angular/cdk/overlay';

import { CartService } from '../cart.service';
import { CartGameComponent } from './cart-game/cart-game.component';
import { CartHeaderComponent } from './cart-header/cart-header.component';

@Component({
  selector: 'app-cart',
  imports: [CartGameComponent, CartHeaderComponent, OverlayModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  isCartOpen = false;
  positions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetX: -1,
    },
  ];

  cartService = inject(CartService);

  cartSizeTitle = computed(() => {
    const singularOrPlural = this.cartService.count() === 1 ? 'item' : 'items';

    return `${this.cartService.count()} ${singularOrPlural} in cart`;
  });

  toggleCartAppearance() {
    this.isCartOpen = !this.isCartOpen;
  }
}

import { Component, input, output } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-cart-header',
  imports: [UpperCasePipe, CurrencyPipe],
  templateUrl: './cart-header.component.html',
  styleUrl: './cart-header.component.css'
})
export class CartHeaderComponent {
  title = input.required<string>();
  total = input.required<number>();
  clearClicked = output();
}

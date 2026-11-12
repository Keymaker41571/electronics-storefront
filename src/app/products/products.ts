import { Component } from '@angular/core';
import { ProductsGrid } from './products-grid/products-grid';

@Component({
  selector: 'app-products',
  imports: [ProductsGrid],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {}

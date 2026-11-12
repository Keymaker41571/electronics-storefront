import { Product } from '../products/product';
import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from '../cart/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /*
    cartItems is a private signal.
    Its initial value is an empty array.
    The array is typed as CartItem[].
    Each item must follow the CartItem interface.
    The CartItem interface can contain a Product object and a quantity.
  */
  private readonly cartItems = signal<CartItem[]>([]);

  // is called by header to compute totalItems()
  readonly totalItems = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0),
  );

  addToCart(product: Product) {
    // Take the current cart, modify it, and return the updated cart. which is an array
    this.cartItems.update((items) => {
      //You're checking whether that product is already in the cart.
      const existingItem = items.find((item) => item.product.id === product.id);

      // if existing variable string? exists? if
      if (existingItem) {
        // If this is the product we're adding, return a copy with its quantity increased by one.
        // Otherwise, return the original item unchanged.
        // And ...item is the spread operator. It copies the existing item's properties into a new object,
        // allowing you to change quantity without losing its other properties
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...items, { product, quantity: 1 }];
    });
  }

  // method name
  removeFromCart(product: Product) {
    // cartItems update the signal
    this.cartItems.update((items) => {
      // create variable and check that variable exists in the cart, existing item against incoming item
      const existingItem = items.find((item) => item.product.id == product.id);

      // if it doesnt exist return the items, means get the new item?
      if (!existingItem) {
        return items;
      }

      // if it does and quantity is greater than 1 means it already exists in the cart?
      if (existingItem.quantity > 1) {
        // then create a map and if the existing does then create new array ..item
        // and remove that item from the cart sstill not sure about this syntax : item, store in this variable?
        // items is the variable from up top the start of the function
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity - 1 } : item,
        );
      }
      // otherwise use items from top where update() is the signal then filter, pass item
      // basically return an array and filter the item that the existing cart doesnt not match id
      // not sure
      return items.filter((item) => item.product.id !== product.id);
    });
  }
}

/*
The template itself generally doesn't care whether the signal is writable or
readonly because templates mostly consume values. The distinction matters in
TypeScript code, where readonly signals prevent accidental updates outside the
owner component/service

const name = signal('');          // string
const age = signal(0);           // number
const user = signal({ id: 1 });  // object
const items = signal([]);        // array
const users = signal<User[]>([]); // array of objects

signal() = writable state
computed() = derived readonly state
effect() = react to signal changes
Expose readonly signals for encapsulation
Signals can hold any type (string, number, object, array, etc.)
Read with signal() and write with .set() / .update()
*/

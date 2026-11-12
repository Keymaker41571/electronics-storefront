import { SignIn } from './sign-in/sign-in';
import { Products } from './products/products';
import { Cart } from './cart/cart';
import { ProductDetail } from './product-detail/product-detail';
import { Home } from './home/home';
import { Routes } from '@angular/router';
import { About } from './about/about';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'products', component: Products},
  { path: 'products/:id', component: ProductDetail},
  { path: 'cart', component: Cart},
  { path: 'about', component: About},
  { path: 'contact', component: Contact},
  { path: 'sign-in', component: SignIn},
];


import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { RegisterComponent } from './register/register.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
 {path:'',component:AllProductsComponent},
 {path:'wishlist', component:WishlistComponent},
 {path:'cart', component:CartComponent},
 {path:'view-product/:id',component:ViewProductsComponent },
 {path:'login' ,component:LoginComponent},
 {path:'register', component:RegisterComponent},
 {path:'order',component:OrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

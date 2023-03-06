import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  //register
  register(eml:any,pnum:any,pswd:any){
    const body={
      eml,
      pnum,
      pswd
    }
    return this.http.post('http://localhost:3000/register',body)
  }

  //login
  login(eml:any,pswd:any){
    const body={
      eml,
      pswd
    }
    return this.http.post('http://localhost:3000/login',body)
  }

  //all-products api
  getAllProducts(){
    return this.http.get('http://localhost:3000/all-products')
  }

  //view-products api
  viewProduct(productId:any){
    return this.http.get('http://localhost:3000/view-product/'+productId)
  }

  //add to wishlist
  addToWishlist(eml:any,product:any){
    const body={
      eml,
      product
    }
    return this.http.post('http://localhost:3000/addToWishlist',body)
  }

  //get wishlist
  getWishlist(eml:any){
    return this.http.get('http://localhost:3000/getWishlist/'+eml)
  }

  //removewishlist
  removeWishlist(eml:any,product:any){
    const body={
      eml,
      product
    }
    return this.http.post('http://localhost:3000/removeWishlist',body)
  }

  //addToCart
  addToCart(eml:any,product:any){
    const body={
      eml,
      product
    }
    return this.http.post('http://localhost:3000/addToCart',body)
  }

  //getCartlist
  getCartList(eml:any){
    return this.http.get('http://localhost:3000/getCartList/'+eml)

  }

  //removeCartItem

  removeCartItem(eml:any,product:any){
    const body={
      eml,
      product
    }
    return this.http.post('http://localhost:3000/removeCartItem',body)
  }

  //emptyCart
  emptyCart(eml:any){
      const body={
        eml
      }
      return this.http.post('http://localhost:3000/emptyCart',body)
  }

  //deleteAcount
  deleteAccount(eml:any){
    return this.http.delete('http://localhost:3000/deleteAccount/'+eml)
  }

  //adding to order
  order(eml:any,data:any){
    const body={
      eml,
      data
    }
    return this.http.post('http://localhost:3000/order',body)
  }

  // getOrders
  getOrders(eml:any){
    return this.http.get('http://localhost:3000/get-orders/'+eml)

  }

  //removeOrder
  removeOrder(eml:any,product:any){
    const body={
      eml,
      product
    }
    return this.http.post('http://localhost:3000/remove-order',body)
  }

  
}

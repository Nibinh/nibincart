import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  user:string=''
  products:any
  emptyWish:string=''
 

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
    if(localStorage.getItem("email")){
      this.user=localStorage.getItem("email")||''
    
    }
   

    this.api.getWishlist(this.user)
    .subscribe((result:any)=>{
      this.products=result.allwishlist
      console.log(this.products.length)
      if(this.products.length==0){
        console.log("dfd")
        this.emptyWish="empty"
      }
    },(result:any)=>{
      alert(result.error.message)
    })

    

  }

  //remove wishlist item
  removeWishlist(product:any){
    this.api.removeWishlist(this.user,product).
    subscribe((result:any)=>{
      

      this.api.getWishlist(this.user)
      .subscribe((result:any)=>{
        this.products=result.allwishlist
        if(this.products.length==0){
          console.log("dfd")
          this.emptyWish="empty"
        }
      },(result:any)=>{
        alert(result.error.message)
      })  
    })
  }

  //addTocart
  addToCart(product:any){
    this.api.addToCart(this.user,product)
    .subscribe((result:any)=>{
      alert(result.message)

      this.api.getWishlist(this.user)
      .subscribe((result:any)=>{
        this.products=result.allwishlist
        console.log(this.products.length)
        if(this.products.length==0){
          console.log("dfd")
          this.emptyWish="empty"
        }
      },(result:any)=>{
        alert(result.error.message)
      })
    })
  }

}

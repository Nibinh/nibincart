import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  user:string=''
  allCartItem:any
  cartEmpty:string=''
  total:any=0
  totalCost:any=0
  qty:any=1
  discount:number=0
  discountTotal:number=0
  checkoutmsg=""


  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
      
    if(localStorage.getItem("email")){
      this.user=localStorage.getItem('email')||''
    }
//getCartlist
    this.api.getCartList(this.user)
    .subscribe((result:any)=>{
      this.allCartItem=result.products

      this.allCartItem.map((item:any)=>{
        this.totalCost+=item.price
        this.discountTotal=this.totalCost 
      })
      if(this.allCartItem.length==0){
       this.cartEmpty='empty'
      }
    })
  }
  
//removeCartitem
  removeCartItem(prod:any){
    this.api.removeCartItem(this.user,prod)
    .subscribe((result:any)=>{
      this.allCartItem.map((pro:any)=>{
        if(prod.id==pro.id){
          this.totalCost-=prod.price
          this.discountTotal=this.totalCost
        }
      })
      this.api.getCartList(this.user)
      .subscribe((result:any)=>{
        this.allCartItem=result.products
        if(this.allCartItem.length==0){
          this.cartEmpty='empty'
        } 
      })
  })
  }

  //emptyCart
  emptyCart(){
    this.api.emptyCart(this.user)
    .subscribe((result:any)=>{
      
      
      this.api.getCartList(this.user)
      .subscribe((result:any)=>{
        this.allCartItem=result.products

        this.allCartItem.map((item:any)=>{
          this.totalCost+=item.price
          this.discountTotal=this.totalCost
          console.log(this.totalCost)
        })
        if(this.allCartItem.length==0){
          this.cartEmpty='empty'
        } 
      }) 
    })
  }


increaseQuantity(prod:any){
  this.qty++
  this.allCartItem.map((item:any)=>{
    
    if(prod==item.id){
      this.total+=item.price
     this.totalCost+=item.price
     this.discountTotal=this.totalCost
    
     console.log(this.total)
    }
   
  })
}

decreaseQuantity(prod:any){
  this.qty--
  this.allCartItem.map((item:any)=>{
    if(prod==item.id){  

        this.total-=item.price
        this.totalCost-=item.price
        this.discountTotal=this.totalCost
     
        console.log(this.total)
      
    }  
  })

}

discount2percent(){
  this.discount=this.totalCost * .02
  this.discountTotal-= this.discount
}

checkout(){
  this.checkoutmsg="Thankyou for shopping"

  setTimeout(()=>{

    this.allCartItem.map((data:any)=>{
      this.api.order(this.user,data)
      .subscribe((result:any)=>{
       console.log(result)
      })
     })

    this.api.emptyCart(this.user)
    .subscribe((result:any)=>{
      
      
      this.api.getCartList(this.user)
      .subscribe((result:any)=>{
        this.allCartItem=result.products

        this.allCartItem.map((item:any)=>{
          this.totalCost+=item.price
          this.discountTotal=this.totalCost
          console.log(this.totalCost)
        })
        if(this.allCartItem.length==0){
          this.cartEmpty='empty'
        } 
      }) 
    })
    window.location.reload()

  },2000)
}

order(){
  this.allCartItem.map((data:any)=>{
   this.api.order(this.user,data)
   .subscribe((result:any)=>{
    console.log(result)
   })
  })
}
  
 




}

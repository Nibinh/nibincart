import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit{

  productId:any
  viewProduct:any
  userEmail:string=''

  constructor(private activateRoute:ActivatedRoute,private api:ApiService ){
    this.userEmail=localStorage.getItem("email")||''
  }

  ngOnInit(): void {
//fetch path parameter from url
    this.activateRoute.params
    .subscribe((data:any)=>{
      console.log(data['id'])
      this.productId=data['id']
    })

    //to get details of requusted product
    this.api.viewProduct(this.productId)
    .subscribe((result:any)=>{
      console.log(result.product)
      console.log(this.userEmail)
      this.viewProduct=result.product
    })
      
  }
  

  addToWishlist(){
    this.api.addToWishlist(this.userEmail,this.viewProduct)
    .subscribe((result:any)=>{
      alert(result.message)
    },(result:any)=>{
      alert(result.error.message)
    })
  }

  addtoCartList(){
    this.api.addToCart(this.userEmail,this.viewProduct)
    .subscribe((result:any)=>{
      alert(result.message)
    },(result:any)=>{
      alert(result.error.message)
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  user:string=""
  allOrders:any
  dsc:string=''

  constructor(private api:ApiService){}

  ngOnInit(): void {

    if(localStorage.getItem("email")){
      this.user=localStorage.getItem("email")||''
    }


    this.api.getOrders(this.user)
    .subscribe((result:any)=>{
      this.allOrders=result.products
      if(this.allOrders.length==0){
        this.dsc="empty"
      }
    })
      
  }

  removeOrder(product:any){

    this.api.removeOrder(this.user,product)
    .subscribe((result:any)=>{
      alert(result.message)
      this.api.getOrders(this.user)
    .subscribe((result:any)=>{
      this.allOrders=result.products
      if(this.allOrders.length==0){
        this.dsc="empty"
      }
    })
    })

    

  }

}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{

  allProducts:any=[]
  searchKey:string=''

  

  constructor(private api:ApiService){    
  }
  ngOnInit(): void {
    this.api.getAllProducts()
    .subscribe((result:any)=>{
      console.log(result.products)
      this.allProducts=result.products
      console.log(this.allProducts)
    })      
  }

 //search
 search(event:any){
  this.searchKey=event.target.value
 }  
 
}

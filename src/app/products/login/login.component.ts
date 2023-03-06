import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { window } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  errorMsg:string=''
  successMsg:boolean=false
  userEmail:any=''
  logininfo:boolean=false

  //login group
  loginForm=this.fb.group({
    eml:['',[Validators.required,Validators.email]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-z]*')]]
  })

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){}

  ngOnInit(): void {

    if(localStorage.getItem("email")){
      this.userEmail=localStorage.getItem("email")||''
      this.logininfo=true
    }
      
  }
  

  login(){
    if(this.loginForm.valid){
      
      let eml=this.loginForm.value.eml
      let pswd=this.loginForm.value.pswd
     // login api

     this.api.login(eml,pswd)
     .subscribe((result:any)=>{
      this.successMsg=true
      localStorage.setItem("email",result.email)
      
      setTimeout(()=>{
      
        window.location.reload()
      },2000)
     

     },(result:any)=>{
      this.errorMsg=result.error.message
     })
    }
    else{
      alert("form invalid")
    } 
  }

  logout(){
    if(localStorage.getItem("email")){
      localStorage.removeItem("email")
      window.location.reload()

    }
  }

  deleteAccount(){
    this.api.deleteAccount(this.userEmail)
    .subscribe((result:any)=>{
      alert(result.message)
      if(localStorage.getItem("email")){
        localStorage.removeItem("email")
        window.location.reload()
  
      }
      

    })

  }

}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  
  //register form group
  registerForm=this.fb.group({
    eml:['',[Validators.required,Validators.email]],
    pnum:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}")]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]

  })

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){}

  register(){
    if(this.registerForm.valid){
     
      let eml=this.registerForm.value.eml
      let pnum=this.registerForm.value.pnum
      let pswd=this.registerForm.value.pswd
      this.api.register(eml,pnum,pswd)
      .subscribe((result:any)=>{
        alert(result.message)
        this.router.navigateByUrl('products/login')
      },(result:any)=>{
        alert(result.error.message)
      })
      
    }
    else{
      alert("Register Failed")
    }
   

  }

}

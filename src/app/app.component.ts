import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import { user } from './_helpers/interface';
import { UsersService } from './_helpers/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular14CRUD';
  registerForm:FormGroup;
  user:user[];
  constructor(private toaster:ToastrService,private fb:FormBuilder,private _user:UsersService){

  } 
  ngOnInit(): void {
    this.setFromState();
  }

  setFromState(){
    this.registerForm=this.fb.group({
      id:[0],
      title:['',Validators.required],
      firstName:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])],
      lastName:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])],
      email:['',Validators.compose([Validators.required,Validators.email])],
      dob:['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required])],
      confirmPassword:['',Validators.required],
      accept:[false,Validators.required]

    });

       
  }
  
  onsubmit(){
    if(this.registerForm.invalid)
    return;

  }
  oncancel(){
    this.registerForm.reset();
  }
  
  getAllUsers(){
    this._user.getUsers().subscribe((res:user[])=>{
      this.user=res;
    });    
  }
}

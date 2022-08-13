import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { operations } from './_helpers/db-operations';
import { user } from './_helpers/interface';
import { UsersService } from './_helpers/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular14CRUD';
  registerForm: FormGroup;
  user: user[];
  submitted: boolean = false;
  buttonText: string = "submit";
  dbOperations: operations;
  constructor(private toaster: ToastrService, private fb: FormBuilder, private _user: UsersService) {

  }
  ngOnInit(): void {
    this.setFromState();
    this.getAllUsers();
  }

  setFromState() {
    this.dbOperations = operations.create;
    this.buttonText = "submit";
    this.registerForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      dob: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.required],
      accept: [false, Validators.required]

    });


  }

  onsubmit() {
    this.submitted = true;
    if (this.registerForm.invalid)
      return;
    switch (this.dbOperations) {
      case operations.create:
        console.log('caling add function');
        this._user.addUser(this.registerForm.value).subscribe(res => {
          this.toaster.success("added");
        });

        this.getAllUsers();
        this.oncancel();
        break;
      case operations.update:
        this._user.updateUser(this.registerForm.value).subscribe(res => {
          this.toaster.success("updated");
        });

        this.getAllUsers();
        this.oncancel();
        break;

    }

  }
  oncancel() {
    this.registerForm.reset();
    this.dbOperations = operations.create;
    this.buttonText = "submit";
    this.submitted = false;
  }

  getAllUsers() {
    this._user.getUsers().subscribe((res: user[]) => {
      this.user = res;
      console.log(res);
    });
  }
  Edit(id: number) {
    this.dbOperations = operations.update;
    this.buttonText = "update";
    let userObj = this.user.find((u: user) => {
      u.id === id;
    });

    this.registerForm.patchValue(userObj);
  }

  get f(){
    return this.registerForm.controls;
  }

  Delete(id: number) {
    this._user.deleteUsers(id).subscribe(res => {
      this.getAllUsers();
      this.toaster.success("deleted", "delete");
    });
  }
}

import { Component, OnInit } from '@angular/core';
import{ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular14CRUD';
  constructor(private toaster:ToastrService){

  } 
  ngOnInit(): void {
  this.toaster.success("sd","sd");
  Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
  });
  }
  

  
}

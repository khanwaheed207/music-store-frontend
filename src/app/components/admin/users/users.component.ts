import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersObservable = new Observable<any[]>();

  constructor(private userService: UsersService, private fb: FormBuilder, private modelService: NgbModal) { }

  userForm: FormGroup = new FormGroup({});
  userModel: Users | undefined;
  updation: boolean = false;
  loader: boolean = false;

  ngOnInit(): void {
    this.usersObservable = this.userService.getUsers();
  }

  addProduct() {
    this.userService.addUser(this.userForm.value).subscribe(res => {
      this.modelService.dismissAll();
    });
  }

  updateUser() {
    this.userService.updateUser(this.userForm.value).subscribe(res => {
      this.modelService.dismissAll();
    })
  }

  deleteUsert() {
    this.userService.deleteUser(this.userForm.value).subscribe(res => {
      this.modelService.dismissAll();
    });
  }

  initialiseModal(productObj: Users | null) {
    if (productObj == null) {
      this.updation = false;
      this.userForm = this.fb.group({
        title: [],
        username: [null],
        email: [null],
        password: [null],
        firstName: [null],
        lastName: [null],
        status: [null],
        contact: [true],
      });
    } else {
      this.updation = true;
      this.userForm = this.fb.group({
        title: [productObj.title],
        username: [productObj.description],
        email: [productObj.email],
        password: [productObj.password],
        firstName: [productObj.firstName],
        lastName: [productObj.lastName],
        contact: [productObj.contact],
      });
    }
  }
}

export interface Users {
  title?: string;
  description?: string;
  email?: string;
  password?: string;
  firstName?: Date;
  lastName?: boolean;
  contact?: boolean;
}

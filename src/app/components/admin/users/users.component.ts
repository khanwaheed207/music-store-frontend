import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  usersList: any = [];

  userForm: FormGroup = new FormGroup({});
  userModel: Users | undefined;
  updation: boolean = false;
  loader: boolean = false;
  public role: string[] = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_ARTIST'];

  constructor(private userService: UsersService, private fb: FormBuilder, private modelService: NgbModal, private router: Router, private modalService: NgbModal) {
    this.createUserForm();
  }

  // Create reactive form for registration
  createUserForm() {
    this.userForm = this.fb.group({
      title: [''],
      username: [''],
      password: [''],
      email: [''],
      firstName: [''],
      lastName: [''],
      status: [''],
      contact: [''],
      roles: [''],
    });
  }

  ngOnInit(): void {
    this.getUserList();
  }

  public getUserList() {
    this.userService.getUsers().subscribe(data => {
      console.log("Data loaded", data);
      this.usersList = data;
    })
  }

  get roles(): FormArray {
    return this.userForm.get('roles') as FormArray;
  }

  onClick() {
    if (this.userForm.get('id')?.value != null) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  addUser() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe(res => {
        console.log("User is added successfully");
        this.modelService.dismissAll();
        this.getUserList();
      }, err => {
        console.log(err);
        console.log("Failed add user, please try again.");
      });
    } else {
      this.validateForm(this.userForm);
      console.log("Form is not valid!");
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userForm.getRawValue()).subscribe((res: any) => {
        console.log("User updated successfull");
        this.modelService.dismissAll();
        this.getUserList();
      }, (err: any) => {
        console.log(err);
        console.log("Failed to update user, Please try again");
      });
    } else {
      this.validateForm(this.userForm);
      console.log("Form is not valid!");
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe((data: any) => {
      console.log("User deleted successfully!");
      this.modelService.dismissAll();
      this.getUserList();
    }, (err: any) => {
      console.log(err);
      console.log("Failed to delete user!");

    });
  }

  public validateForm(form: any) {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      if (control instanceof FormControl || control instanceof FormArray) {
        control.markAsTouched({ onlySelf: true })
      } else {
        this.validateForm(form);
      }
    })
  }

  hasError(name: string) {
    const field = this.userForm.get(name);
    return (field?.invalid && field?.touched && field?.errors);
  }


  openModal(modal: any, user: Users | null = null) {
    this.initialiseModal(user);
    this.modalService.open(modal, { size: "xl" });
  }

  changeRole($event: any) {
    let roles = [];
    roles.push($event.target.value);
    this.userForm.get('roles')?.patchValue(roles);
  }

  // User getter
  get form() {
    return this.userForm.controls;
  }

  get title() {
    return this.form['title'];
  }

  get username() {
    return this.form['username'];
  }

  get password() {
    return this.form['password'];
  }

  get email() {
    return this.form['email'];
  }

  get firstName() {
    return this.form['firstName'];
  }

  get lastName() {
    return this.form['lastName'];
  }

  get status() {
    return this.form['status'];
  }

  get contact() {
    return this.form['contact'];
  }

  initialiseModal(userObj: Users | null) {
    if (userObj == null) {
      this.updation = false;
      this.userForm = this.fb.group({
        title: [null],
        username: [null],
        email: [null],
        password: [null],
        firstName: [null],
        lastName: [null],
        status: [null],
        contact: [true],
        roles: [null]
      });
    } else {
      this.updation = true;
      this.userForm = this.fb.group({
        id: [userObj.id],
        title: [userObj.title],
        username: [userObj.username],
        email: [userObj.email],
        password: [userObj.password],
        firstName: [userObj.firstName],
        lastName: [userObj.lastName],
        contact: [userObj.contact],
        status: [userObj.status],
        roles: [userObj.roles],

      });
    }
  }
}

export interface Users {
  id?: number;
  title?: string;
  username?: string;
  description?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  contact?: string;
  status?: string;
  roles?: string;
}

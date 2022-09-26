import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Define reactive form
  updation: boolean = false;
  public registerForm!: FormGroup;
  public isSubmitted: boolean = false;
  public response: string = "";
  public role: string[] = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_ARTIST'];

  constructor(private router: Router, private authSrv: AuthService, private formBuilder: FormBuilder) {
    this.createRegisterForm();
  }

  // Create reactive form for registration
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      status: ['', Validators.required],
      contact: ['', Validators.required],
      roles: ['', Validators.required],
    });

  }

  ngOnInit(): void {
  }

  // Register
  public registerUser(): void {
    if (this.registerForm.valid) {
      this.isSubmitted = true;
      this.authSrv.sighUp(this.registerForm.getRawValue()).subscribe((data: any) => {
        this.response = "Registration successfull!";
        this.registerForm.reset();
        this.router.navigateByUrl("/auth/login");
      }, err => {
        console.log(err);
        this.response = "Registration failed!";
      });
    } else {
      this.validateForm(this.registerForm);
    }
  }

  public validateForm(form: any) {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      if (control instanceof FormControl || control instanceof FormArray) {
        control.markAsTouched({ onlySelf: true })
      } else {
        this.validateForm(form);
      }
    });
  }

  hasError(name: string) {
    const field = this.registerForm.get(name);
    return (field?.invalid && field?.touched && field?.errors);
  }

  goTo(url: any) {
    this.router.navigateByUrl(url);
  }

  changeRole($event: any) {
    let roles = [];
    roles.push($event.target.value);
    this.registerForm.get('roles')?.patchValue(roles);
  }

  // Register getter
  get form() {
    return this.registerForm.controls;
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
}





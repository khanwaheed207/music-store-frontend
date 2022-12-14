import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Define reactive form
  public loginForm!: FormGroup;
  public isSubmitted: boolean = false;


  constructor(private router: Router, private authSrv: AuthService, private formBuilder: FormBuilder) {
    this.createLoginForm();
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  };

  ngOnInit(): void {
  }

  // Login
  public loginUser(): void {
    if (this.loginForm.valid) {
      this.isSubmitted = true;
      this.authSrv.signIn(this.loginForm.getRawValue()).subscribe((data: any) => {
        this.setUser(data);
        if (data.roles[0] == "ROLE_ADMIN") {
          this.router.navigateByUrl("/admin/users");
        } else {
          this.router.navigateByUrl("/instruments");
        }
      }, err => {
        switch(err.status) {
          case 401 :
            this.router.navigateByUrl("/not-found");
            break;
          
        }
      })
    } else {
      this.validateForm(this.loginForm);
    }
  }

  // Validate Form
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
    const field = this.loginForm.get(name);
    return (field?.invalid && field?.touched && field?.errors);
  }

  goTo(url: any) {
    this.router.navigateByUrl(url);
  }

  // Login getter
  get form() {
    return this.loginForm.controls;
  }

  get username() {
    return this.form['username'];
  }

  get password() {
    return this.form['password'];
  }


  public setUser(data: any) {
    sessionStorage.setItem("ID", data.id);
    sessionStorage.setItem("USERNAME", data.username);
    sessionStorage.setItem("EMAIL", data.email);
    sessionStorage.setItem("TOKEN", data.accessToken);
    sessionStorage.setItem("ROLES", JSON.stringify(data.roles));
  }

}



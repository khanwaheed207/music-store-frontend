import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public productSrv: ProductsService, public authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl("/auth/login");
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersObservable = new Observable<any[]>();

  constructor(private userService : UsersService) { }

  ngOnInit(): void {
    this.usersObservable = this.userService.getUsers();
  }

}

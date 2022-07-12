import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { UserService } from 'src/app/authentication/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user = '';

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findById(this.authService.getUserId()).subscribe(user => {
      this.user = user.firstName + " " + user.lastName;      
    });
  }

  isHomeRoute() {
    var homeRoute;
    if (this.router.url == '/' || this.router.url == '/login') {
      homeRoute = false;
    } else {
      homeRoute = true;
    }
    return homeRoute;
  }

  logout() {
    this.router.navigate(['/']);
  }

}

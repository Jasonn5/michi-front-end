import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {  
  public isAdmin = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.getRoles().includes('Admin')
  }
  
}

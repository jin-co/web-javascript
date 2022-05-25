import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated:boolean = false
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.userUpdatedListener().subscribe(result => {
      this.isAuthenticated = result
    })
  }

  onLogout() {
    this.userService.logout()
  }
}

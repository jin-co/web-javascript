import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSubs!:Subscription
    
  constructor(private userService:UserService) {}

  ngOnInit(): void {
    this.userSubs = this.userService.userUpdateListener().subscribe(result => {
      this.isAuthenticated = result
    })
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe()
  }

  onLogout() {
    this.userService.logout()
  }
}

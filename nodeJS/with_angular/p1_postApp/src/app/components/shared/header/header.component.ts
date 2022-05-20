import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authListenerSubs!: Subscription
  isAuthenticated:boolean = false
  constructor(private userService:UserService) { }  

  ngOnInit(): void {
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(result => {
      this.isAuthenticated = result
    })
  }
  
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe()
  }

  onLogout() {
    console.log('clicked')
    this.userService.logout()
  }
}

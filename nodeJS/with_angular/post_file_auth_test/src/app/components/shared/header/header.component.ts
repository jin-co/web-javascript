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
  private authListenerSubs!: Subscription
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.authListenerSubs = 
    this.userService.authUpdatedListener().subscribe(result => {
      console.log(result)
      this.isAuthenticated = result
    })
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe()
  }
}

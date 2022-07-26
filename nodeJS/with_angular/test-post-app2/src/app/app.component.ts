import { Component, OnInit } from '@angular/core';
import { Post } from './models/post.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-post-app2';

  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.userService.autoAuth()  
  }
}

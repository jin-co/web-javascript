import { Component, Input, OnInit } from '@angular/core';
import { Post } from './models/post';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'p1_postApp';
  // post:any = []
  post: Post[] = [];

  constructor(private userService: UserService) {}

  onPostAdded(post: any) {
    this.post.push(post);
  }

  ngOnInit(): void {
    this.userService.autoAuth()
  }
}

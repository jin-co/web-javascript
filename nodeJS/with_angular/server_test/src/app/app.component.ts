import { Component, Input } from '@angular/core';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'server_test';
  posts:Post[] = []

  addPost(e:Post) {
    this.posts.push(e)
  }
}

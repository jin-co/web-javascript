import { Component } from '@angular/core';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-post-app2';

  posts:Post[] = []

  addPost(e:any) {
    this.posts.push(e)
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'file_test';
  posts:any = []
  addPost(e:any) {
    this.posts.push(e)
  }
}

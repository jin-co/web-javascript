import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts:any = []
  title = 'test-post-app';

  addPost(e:any) {
    this.posts.push(e)
    console.log('event emitter app: ', e)
  }
}

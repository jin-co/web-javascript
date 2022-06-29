import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-post-app';

  post:any = []
  addPost(e:any) {
    this.post.push(e)
  }
}

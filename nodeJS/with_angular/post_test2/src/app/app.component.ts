import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'post_test2';
  newPost:any = []
  addPost(e:Event) {
        this.newPost.push(e)
  }
}

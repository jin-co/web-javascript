import { Component, Input } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts:Post[] = []



  onPostAdded(post:Event) {
    console.log(post)
    this.storedPosts.push() // error push(post)
  }

  
}

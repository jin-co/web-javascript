import { Component, Input } from '@angular/core';
import { Post } from './models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  title = 'p1_postApp';
  // post:any = []
  post:Post[] = []
  
  onPostAdded(post:any) {    
    this.post.push(post)    
  }
}

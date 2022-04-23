import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  title = 'p1_postApp';
  post:any = []

  
  onPostAdded(post:Event) {    
    this.post.push(post)}
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts = []
  onPostAdded(post:Event) {
    console.log(post)
    this.storedPosts.push(post)
  }

  
}

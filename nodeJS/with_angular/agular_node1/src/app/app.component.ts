import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message!:string
  entered!:string
  title = 'agular_node1';

  hi(input:string) {
    this.message = input
  }
}

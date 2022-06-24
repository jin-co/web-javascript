import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged:boolean = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.authUpdateListener().subscribe(result => {
      this.isLogged = result
    })
  }

}

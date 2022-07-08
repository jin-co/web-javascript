import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged:boolean = false
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.isLogged = this.userService.getIsLogged()
    this.userService.userUpdateListener().subscribe(result => {
      this.isLogged = result
    })
  }
}

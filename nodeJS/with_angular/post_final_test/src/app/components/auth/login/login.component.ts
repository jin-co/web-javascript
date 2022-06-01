import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if(form.valid) {
      this.userService.login(form.value.email, form.value.password);
    }
    form.resetForm()    
  }
}

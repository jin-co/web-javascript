import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onSignin(form: NgForm) {
    if (form.valid) {
      this.userService.addUser(form.value.email, form.value.password);
    }
    form.resetForm();
  }
}

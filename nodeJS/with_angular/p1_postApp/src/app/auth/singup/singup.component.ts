import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isLoading: boolean = false;

  constructor(public userService: UserService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.addUser(form.value.email, form.value.password);
    }
  }
}

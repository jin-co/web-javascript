import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/services/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.addUser(form.value.email, form.value.password);
    }
    form.resetForm();
  }
}

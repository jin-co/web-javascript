import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    isLoading:boolean = false

    constructor(public userService: UserService) {}

    onSubmit(form: NgForm) {
      if (form.valid) {
        this.userService.login(form.value.email, form.value.password);
      }
    }
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-coordinator-login',
  templateUrl: './coordinator-login.component.html',
  styleUrls: ['./coordinator-login.component.css']
})
export class CoordinatorLoginComponent implements OnInit {

  errormsg: any;
  errorshow: boolean = false;

  constructor(
    private router: Router,
    private service: ApiserviceService
  ) { }

  ngOnInit(): void {
  }

  // form group
  coordinatorLoginForm = new FormGroup({
    'coordinatorEmail': new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  });

  // Coordinator Login
  coordinatorLogin() {
    // check if form values are valid
    if (this.coordinatorLoginForm.valid) {

      this.service.coordinatorLogin(this.coordinatorLoginForm.value).subscribe((res) => {
        console.log(res, ' ==> coordinator login res');

        if (res.status == true) {

          console.log(res.data[0].coordinatorId);

          // Save coordinator data to local storage
          const _coordinatorId = res.data[0].coordinatorId;
          const _coordinatorFirstName = res.data[0].coordinatorFirstName;
          const _coordinatorLastName = res.data[0].coordinatorLastName;
          const _coordinatorEmail = res.data[0].coordinatorEmail;

          this.service.setLoginCoordinator(_coordinatorId, _coordinatorFirstName, _coordinatorLastName, _coordinatorEmail);
          window.alert('login success.');

          // Go to 'main' page.
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });

        } else {
          console.log('login fail');

          this.errorshow = true;
          this.errormsg = 'login failed! try again.';
        }

      })

    }
    else {
      console.log('input validation fail');

      this.errorshow = true;
      this.errormsg = 'please enter valid value on the input boxes';
    }
  }


  // close errormessage
  closeErrorMsg() {
    this.errorshow = false;
  }

}

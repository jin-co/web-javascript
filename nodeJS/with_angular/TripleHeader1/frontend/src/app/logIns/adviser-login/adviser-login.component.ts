import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-adviser-login',
  templateUrl: './adviser-login.component.html',
  styleUrls: ['./adviser-login.component.css']
})
export class AdviserLoginComponent implements OnInit {

  errormsg: any;
  errorshow: boolean = false;

  constructor(
    private router: Router,
    private service: ApiserviceService
  ) { }

  ngOnInit(): void {
  }

  // form group
  adviserLoginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  });

  // Adviser Login
  adviserLogin() {
    // check if form values are valid
    if (this.adviserLoginForm.valid) {

      this.service.adviserLogin(this.adviserLoginForm.value).subscribe((res) => {
        console.log(res, ' ==> adviser login res');

        if (res.status == true) {

          console.log(res.data[0].adviserId);

          // Save coordinator data to local storage
          const _adviserId = res.data[0].adviserId;
          const _adviserFirstName = res.data[0].firstName;
          const _adviserLastName = res.data[0].lastName;
          const _adviserEmail = res.data[0].email;

          this.service.setLoginAdviser(_adviserId, _adviserFirstName, _adviserLastName, _adviserEmail);
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

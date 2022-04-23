import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviceService } from './../../apiservice.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit {

  errormsg: any;
  errorshow: boolean = false;

  constructor(
    private router: Router,
    private service: ApiserviceService
  ) { }

  ngOnInit(): void {
  }

  // form group
  clientLoginForm = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  });

  // Client Login
  clientLogin() {
    // check if form values are valid
    if (this.clientLoginForm.valid) {

      this.service.clientLogin(this.clientLoginForm.value).subscribe((res) => {
        console.log(res, ' ==> res');

        if (res.status == true) {
          // console.log('login success');
          console.log(res.data[0].clientId);

          // Save user data to local storage
          const _clientId = res.data[0].clientId;
          const _clientName = res.data[0].clientName;
          const _email = res.data[0].email;

          this.service.setLoginClient(_clientId, _clientName, _email,);
          // this.headerComponent.ngOnInit();    // refresh header component
          window.alert('login success.')

          // Go to 'main' page.
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });

        } else {
          console.log('login fail');

          this.errorshow = true;
          this.errormsg = 'login failed! try again.';
        }

      });

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

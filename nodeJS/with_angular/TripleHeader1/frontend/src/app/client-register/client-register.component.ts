import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  getparamid: any;
  errormsg: any;
  successmsg: any;
  // _id: any;
  isLoginClient: Observable<boolean> = of(false);

  constructor(
    private router: Router,
    private service: ApiserviceService
  ) { }

  ngOnInit(): void {

    // when client is logined, go to main page
    this.service.isLogin('client').subscribe((res) => {
      this.isLoginClient = of(res);

      if (this.isLoginClient === of(true)) {
        window.alert('already logined. Go to the main page.');
        this.router.navigateByUrl('/');
      }
    });

    /*
    if (this.service.isLogin('client')) {
      window.alert('already logined. Go to the main page.');
      this.router.navigateByUrl('/');
    }
    */

  }

  // form group
  clientRegisterForm = new FormGroup({
    'clientName': new FormControl('', [Validators.required, Validators.maxLength(50)]),
    'email': new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    // 'passwordConfirm': new FormControl('', [Validators.required]),
    'streetAddress': new FormControl('', [Validators.maxLength(50)]),
    'streetAddress2': new FormControl('', [Validators.maxLength(60)]),
    'city': new FormControl('', [Validators.maxLength(40)]),
    'provinceCode': new FormControl('', [Validators.maxLength(2)]),
    'postalCode': new FormControl('', [Validators.maxLength(6)]),
    'website': new FormControl('', [Validators.maxLength(100)]),
  });

  clientRegisterSubmit() {
    console.log(this, this.clientRegisterForm.value);

    if (this.clientRegisterForm.valid) {
      console.log(this.clientRegisterForm.value);
      this.service.createClient(this.clientRegisterForm.value).subscribe(
        (res) => {
          console.log(res, 'res=>');
          // this.clientRegisterForm.reset();
          this.successmsg = res.message;

          // Save user data to local storage
          const _clientId = res.data['insertId'];
          const _clientName = this.clientRegisterForm.get('clientName')?.value;
          const _email = this.clientRegisterForm.get('email')?.value;

          this.service.setLoginClient(_clientId, _clientName, _email,);

          // Go to 'Add client proposal page'
          // this.router.navigateByUrl('/add-client-proposal');

          // delete all local storage value
          localStorage.clear();

          // Go to 'Client login' page.
          this.router.navigateByUrl('/client-login');
        },
        err => {
          console.error(err);
        }
      );
    }
    else {
      this.errormsg = 'All fields are required';
    }
  }

}

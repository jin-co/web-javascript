import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

  errormsg: any;
  errorshow: boolean = false;

  constructor(
    private router: Router,
    private service: ApiserviceService
  ) { }

  ngOnInit(): void {
  }

  // form group
  studentLoginForm = new FormGroup({
    'studentFirstName': new FormControl('', [Validators.required, Validators.maxLength(40)]),
    'studentLastName': new FormControl('', [Validators.required, Validators.maxLength(40)]),
    'teamName': new FormControl('', [Validators.required, Validators.maxLength(45)])
  });

  // Student Login
  studentLogin() {
    // check if form values are valid
    if (this.studentLoginForm.valid) {

      this.service.studentLogin(this.studentLoginForm.value).subscribe((res) => {

        console.log(res, ' ==> res');

        if (res.status == true) {
          // console.log('login success');
          /*
          console.log(res.data[0].studentId);
          console.log(res.data[0].studentFirstName);
          console.log(res.data[0].studentLastName);
          console.log(res.data[0].teamId);
          console.log(res.data[0].teamName);
          */

          // Save user data to local storage
          const _studentId = res.data[0].studentId;
          const _studentFirstName = res.data[0].studentFirstName;
          const _studentLastName = res.data[0].studentLastName;
          const _teamId = res.data[0].teamId;

          this.service.setLoginStudent(_studentId, _studentFirstName, _studentLastName, _teamId);
          window.alert('student login success.')

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

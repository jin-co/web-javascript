import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  screenWidth: any;
  navOpenBtnState = false;
  navOpenState = false;
  panelOpenState = false;

  isLoginAny: Observable<boolean> = of(false); // is login any
  isLoginClient: Observable<boolean> = of(false);
  isLoginStudent: Observable<boolean> = of(false);
  isLoginAdviser: Observable<boolean> = of(false);
  isLoginCoordinator: Observable<boolean> = of(false);

  // logged-in user info.
  // loggedinClientName: string | null = '';
  // loggedinStudentName: string | null = '';
  // loggedinAdviserName: string | null = '';
  // loggedinCoordinatorName: string | null = '';

  //*** test
  loggedInUserName: string | null = '';
  loggedInUserTooltip: string | null = '';

  constructor(private router: Router, private service: ApiserviceService) { }

  ngOnInit(): void {
    this.service.isLogin('any').subscribe((res) => {
      this.isLoginAny = of(res);
    });

    this.service.isLogin('client').subscribe((res) => {
      // console.log(res);
      this.isLoginClient = of(res);

      // this.loggedinClientName = localStorage.getItem('clientName');

      //***test
      let loggedInUserFirstName = localStorage.getItem('clientName');

      if (loggedInUserFirstName !== null) {
        this.loggedInUserName = loggedInUserFirstName
          .substring(0, 1)
          .toUpperCase();
        this.loggedInUserTooltip = loggedInUserFirstName + ' (Client)';
      }
    });

    this.service.isLogin('student').subscribe((res) => {
      // console.log(res);
      this.isLoginStudent = of(res);

      // this.loggedinStudentName = (
      //   localStorage.getItem('studentFirstName') +
      //   ' ' +
      //   localStorage.getItem('studentLastName')
      // ).trim();

      //***test
      let loggedInUserFirstName = localStorage.getItem('studentFirstName');
      let loggedInUserLastName = localStorage.getItem('studentLastName');

      if (loggedInUserFirstName !== null) {
        this.loggedInUserName = loggedInUserFirstName
          .substring(0, 1)
          .toUpperCase();
      }
      if (loggedInUserLastName !== null) {
        this.loggedInUserName += loggedInUserLastName
          .substring(0, 1)
          .toUpperCase();
      }

      this.loggedInUserTooltip = loggedInUserFirstName + ' ' + loggedInUserLastName + ' (Student)';
    });

    this.service.isLogin('adviser').subscribe((res) => {
      // console.log(res);
      this.isLoginAdviser = of(res);

      // this.loggedinAdviserName = (
      //   localStorage.getItem('adviserFirstName') +
      //   ' ' +
      //   localStorage.getItem('adviserLastName')
      // ).trim();

      //***test
      let loggedInUserFirstName = localStorage.getItem('adviserFirstName');
      let loggedInUserLastName = localStorage.getItem('adviserLastName');

      if (loggedInUserFirstName !== null) {
        this.loggedInUserName = loggedInUserFirstName
          .substring(0, 1)
          .toUpperCase();
      }
      if (loggedInUserLastName !== null) {
        this.loggedInUserName += loggedInUserLastName
          .substring(0, 1)
          .toUpperCase();
      }

      this.loggedInUserTooltip = loggedInUserFirstName + ' ' + loggedInUserLastName + ' (Faculty adviser)';

    });


    this.service.isLogin('coordinator').subscribe((res) => {
      // console.log(res);
      this.isLoginCoordinator = of(res);

      // this.loggedinCoordinatorName = (
      //   localStorage.getItem('coordinatorFirstName') +
      //   ' ' +
      //   localStorage.getItem('coordinatorLastName')
      // ).trim();

      //***test
      let loggedInUserFirstName = localStorage.getItem('coordinatorFirstName');
      let loggedInUserLastName = localStorage.getItem('coordinatorLastName');

      if (loggedInUserFirstName !== null) {
        this.loggedInUserName = loggedInUserFirstName
          .substring(0, 1)
          .toUpperCase();
      }
      if (loggedInUserLastName !== null) {
        this.loggedInUserName += loggedInUserLastName
          .substring(0, 1)
          .toUpperCase();
      }

      this.loggedInUserTooltip = loggedInUserFirstName + ' ' + loggedInUserLastName + ' (Program coordinator)';
    });

    //***test
    this.screenWidth = window.innerWidth
    if (this.screenWidth < 990) {
      this.navOpenState = false
      this.navOpenBtnState = true
    } else {
      this.navOpenState = true
      this.navOpenBtnState = false
    }
  }

  //***test
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth

    if (this.screenWidth > 990) {
      this.navOpenState = true
      this.navOpenBtnState = false
    } else {
      this.navOpenState = false
      this.navOpenBtnState = true
    }
  }

  // Logout
  logout() {
    this.service.logout();
    this.ngOnInit();
    window.alert('logged out successfully.');

    // Go to 'main' page.
    this.router.navigateByUrl('/');
  }

  toggleNav() {
    this.navOpenState = !this.navOpenState
  }

  closeOtherNavs(e: Event) {
    let panes = document.querySelectorAll('mat-expansion-panel')
    console.log(e.target)
    console.log(panes)
    panes.forEach(p => {
      console.log(p)


    });
  }
}

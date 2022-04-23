import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isLoginAny: Observable<boolean> = of(false); // is login any
  isLoginClient: Observable<boolean> = of(false);
  isLoginStudent: Observable<boolean> = of(false);
  isLoginAdviser: Observable<boolean> = of(false);
  isLoginCoordinator: Observable<boolean> = of(false);

  constructor(private router: Router, private service: ApiserviceService) { }

  ngOnInit(): void {
    this.service.isLogin('any').subscribe((res) => {
      this.isLoginAny = of(res);
    });

    this.service.isLogin('client').subscribe((res) => {
      this.isLoginClient = of(res);
    });

    this.service.isLogin('student').subscribe((res) => {
      this.isLoginStudent = of(res);
    });

    this.service.isLogin('adviser').subscribe((res) => {
      this.isLoginAdviser = of(res);
    });

    this.service.isLogin('coordinator').subscribe((res) => {
      this.isLoginCoordinator = of(res);
    });
  }
}

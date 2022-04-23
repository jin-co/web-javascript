import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coordinator-schoolterm-list',
  templateUrl: './coordinator-schoolterm-list.component.html',
  styleUrls: ['./coordinator-schoolterm-list.component.css']
})
export class CoordinatorSchooltermListComponent implements OnInit {

  errormsg: any;
  successmsg: any;
  schoolTermData: any;

  constructor(
    private service: ApiserviceService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {

    // check login status (coordinator)
    this.service.checkLogin('coordinator');

    // schoolTeramData
    this.service.getAllSchoolTermData().subscribe((res: { data: any; }) => {
      this.schoolTermData = res.data;
    });

  }

  // set current schoolTerm
  setCurrentTerm(id: any) {
    this.service.setCurrentSchoolTerm(id).subscribe((res: { message: any; }) => {
      this.successmsg = res.message;
      this.refresh();
    });
  }

  // refresh
  refresh(): void {
    this.router.navigateByUrl(`/`, { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }

}

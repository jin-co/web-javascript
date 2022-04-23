import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-student-application-list',
  templateUrl: './student-application-list.component.html',
  styleUrls: ['./student-application-list.component.css']
})
export class StudentApplicationListComponent implements OnInit {

  teamId: any;
  listData: any;

  constructor(
    private service: ApiserviceService
  ) { }

  ngOnInit(): void {

    // check login status (student)
    this.service.checkLogin('student');

    this.teamId = localStorage.getItem('teamId') || '';
    // console.log(this.teamId);

    // get all application by team
    this.service.getAllApplicationByTeam(this.teamId).subscribe((res) => {
      this.listData = res.data;

      // get additional data
      for (let i in this.listData) {
        // add 'application status' to the listData (ex. 1: Draft, 2: Registered ... )
        this.listData[i].applicationStatusName = this.service.getStudentApplicationStatusName(this.listData[i].applicationStatus);
      }

    });

  }




}

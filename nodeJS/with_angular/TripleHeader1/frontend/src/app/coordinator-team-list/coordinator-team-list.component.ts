import { ApiserviceService } from 'src/app/apiservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coordinator-team-list',
  templateUrl: './coordinator-team-list.component.html',
  styleUrls: ['./coordinator-team-list.component.css']
})
export class CoordinatorTeamListComponent implements OnInit {

  listData: any;

  constructor(
    private service: ApiserviceService
  ) { }

  ngOnInit(): void {

    // check login status (coordinator)
    this.service.checkLogin('coordinator');

    // get student team list with join tables
    this.service.getStudentTeamListWithData('W22').subscribe((res) => {
      this.listData = res.data;
    });

  }

}

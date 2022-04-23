import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-coordinator-project-details',
  templateUrl: './coordinator-project-details.component.html',
  styleUrls: ['./coordinator-project-details.component.css']
})
export class CoordinatorProjectDetailsComponent implements OnInit {

  errormsg: any;
  successmsg: any;

  projectId: any;

  detailsData: any;
  detailsClient: any;

  applied: boolean = false;

  appliedTeamsData: any;

  constructor(
    private service: ApiserviceService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {

    // check login status (coordinator)
    this.service.checkLogin('coordinator');

    // paramater
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');


    // Get project details
    this.service.getSingleProject(this.projectId).subscribe((res) => {
      console.log(res, '==> res');
      this.detailsData = res.data;
    });

    // get applied teams
    this.service.getAllAppliedTeamsByProject(this.projectId).subscribe((res) => {
      this.appliedTeamsData = res.data;
    });

  }

}

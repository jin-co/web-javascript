import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from './../apiservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-client-proposal-details',
  templateUrl: './apply-client-proposal-details.component.html',
  styleUrls: ['./apply-client-proposal-details.component.css']
})
export class ApplyClientProposalDetailsComponent implements OnInit {

  errormsg: any;
  successmsg: any;

  projectId: any;
  clientId: any;
  teamId: any;

  detailsData: any;
  detailsClient: any;

  applied: boolean = false;

  uploadFileId: any;
  uploadFileListData: any;
  appliedTeamsData: any;

  constructor(
    private service: ApiserviceService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {

    // check login status (student)
    this.service.checkLogin('student');

    // paramater
    this.projectId = this.activatedRoute.snapshot.queryParams['projectId'];
    this.clientId = this.activatedRoute.snapshot.queryParams['clientId'];

    // local Storage
    this.teamId = localStorage.getItem('teamId');

    // Get project details
    this.service.getSingleProject(this.projectId).subscribe((res) => {
      // console.log(res, '==> res');
      this.detailsData = res.data;
    });

    // get single client details
    this.service.getSingleClient(this.clientId).subscribe((res) => {
      this.detailsClient = res.data;
    });

    // get applied teams
    this.service.getAllAppliedTeamsByProject(this.projectId).subscribe((res) => {
      this.appliedTeamsData = res.data;
    });

    // get application status to project    
    this.service.getProjectTeamApplicationStatus(this.projectId, this.teamId).subscribe((res) => {
      if (res.count > 0) {
        this.applied = true;
      } else {
        this.applied = false;
      }
    });
  }

  // 'Cancel' button - go Apply Client Proposal page
  goApplyClientProposal() {
    this.router.navigateByUrl(`/apply-client-proposal`);
  }

  // 'Details' button
  // TODO

  // 'Next' button - go Apply Proposal Add page
  goApplyProposalAdd(_productId: any) {
    this.router.navigateByUrl(`/apply-client-proposal-add?projectId=${_productId}`);
  }



}

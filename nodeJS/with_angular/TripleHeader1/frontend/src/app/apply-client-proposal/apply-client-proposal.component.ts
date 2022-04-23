import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-apply-client-proposal',
  templateUrl: './apply-client-proposal.component.html',
  styleUrls: ['./apply-client-proposal.component.css']
})
export class ApplyClientProposalComponent implements OnInit {

  studentId: any;
  teamId: any;
  projectList: any;

  constructor(
    private service: ApiserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // check login status (student)
    this.service.checkLogin('student');

    // Get 'studentId' and 'teamId' from Local Storage
    this.studentId = localStorage.getItem('studentId');
    this.teamId = localStorage.getItem('teamId');

    // Get all project list with client info
    /* projectStatus
    -- 1: Registered
    -- 2: Available
    -- 3: InProgress
    -- 4: Matched
    -- 5: Taken
    */
    this.service.getProjectListByProjectStatus('123').subscribe((res) => {
      // console.log(res, ' ===> getAllProject');
      this.projectList = res.data;

      // Get additional data
      for (let i in this.projectList) {
        // Add 'project Status Name' to the projectList (Ex. 1: Registered)
        this.projectList[i].projectStatusName = this.service.getProjectStatusName(this.projectList[i].projectStatus);

        // Add 'Project Team Application Status' to the projectList (Ex. 1: Draft, 2: Registered)
        let applicationStatus = '';
        this.service.getProjectTeamApplicationStatus(this.projectList[i].projectId, this.teamId).subscribe((res2) => {
          if (res2.data) {
            applicationStatus = res2.data[0].applicationStatus;
          }
        });

        this.projectList[i].applicationStatus = applicationStatus;
        this.projectList[i].applicationStatusName = this.service.getStudentApplicationStatusName(applicationStatus);
      }

    });
  }

  // go Apply Client Proposal Details page
  goApplyClientProposalDetails(_productId: any, _clientId: any) {
    this.router.navigateByUrl(`/apply-client-proposal-details?projectId=${_productId}&clientId=${_clientId}`);
  }

}

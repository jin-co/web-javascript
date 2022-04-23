import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-apply-client-proposal-add',
  templateUrl: './apply-client-proposal-add.component.html',
  styleUrls: ['./apply-client-proposal-add.component.css']
})
export class ApplyClientProposalAddComponent implements OnInit {

  errormsg: any;
  successmsg: any;

  studentApplicationId: any;
  projectId: any;
  teamId: any;
  uploadFileId: any;

  detailsProject: any;

  constructor(
    private service: ApiserviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {

    // check login status (student)
    this.service.checkLogin('student');

    // paramater
    this.projectId = this.activatedRoute.snapshot.queryParams['projectId'];

    // local Storage
    this.teamId = localStorage.getItem('teamId');

    // Get project details
    this.service.getSingleProject(this.projectId).subscribe((res) => {
      this.detailsProject = res.data;
    });

  }

  // form group
  applicationForm = new FormGroup({
    'applicationTitle': new FormControl('', [Validators.required, Validators.maxLength(100)]),
    'description': new FormControl('', [Validators.nullValidator]),
    'projectId': new FormControl('', [Validators.nullValidator]),
    'teamId': new FormControl('', [Validators.nullValidator]),
    'uploadFileId': new FormControl('', [Validators.nullValidator]),
    'uploadFile': new FormControl('', [Validators.nullValidator]),
  });

  // upload
  upload(event: any) {
    const file = event.target.files[0];
    const formdata = new FormData();
    formdata.append('uploadFile', file);
    formdata.append('connectTableName', 'studentapplication');  // studentapplication file

    this.httpClient
      .post(`${this.service.rootURL}/upload-file`, formdata)
      .subscribe(
        (val) => {
          console.log(val);
          const jsonVal = JSON.parse(JSON.stringify(val));
          // set uploadFileId
          this.uploadFileId = jsonVal['uploadFileId'];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // 'Back' button - go Apply Client Proposal Details page
  goApplyClientProposalDetails(_productId: any) {
    this.router.navigateByUrl(`/apply-client-proposal-details?projectId=${_productId}`);
  }

  // 'Apply' button - Save Apply Client Proposal
  goApplyProposalAddSubmit() {

    if (this.applicationForm.valid) {

      this.service.createApplication(this.applicationForm.value).subscribe(
        (res) => {
          this.applicationForm.reset();
          this.successmsg = res.message;

          const jsonVal = JSON.parse(JSON.stringify(res));
          this.studentApplicationId = jsonVal['insertId'];
          this.uploadFileId = jsonVal['uploadFileId'];

          // local storage
          localStorage.setItem('insertId', res.data['insertId']);

          // Go to page (ex. http://localhost:4200/apply-client-proposal-completed)          
          const _id = this.studentApplicationId;
          this.router.navigateByUrl(`/apply-client-proposal-completed?studentApplicationId=${_id}`);
        },
        (error) => {
          console.log(error);
        }
      );

    }
    else {
      this.errormsg = 'Please enter valid values';
    }

  }

}

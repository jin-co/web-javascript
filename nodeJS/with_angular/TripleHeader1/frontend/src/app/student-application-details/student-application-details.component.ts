import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-student-application-details',
  templateUrl: './student-application-details.component.html',
  styleUrls: ['./student-application-details.component.css']
})
export class StudentApplicationDetailsComponent implements OnInit {

  studentApplicationId: any;
  projectId: any;
  clientId: any;
  teamId: any;

  detailsApplication: any;
  detailsProject: any;
  detailsClient: any;

  uploadFileListData: any;

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
    this.studentApplicationId = this.activatedRoute.snapshot.paramMap.get('id');

    // local Storage
    this.teamId = localStorage.getItem('teamId');

    // single application data
    this.service.getSingleApplication(this.studentApplicationId).subscribe((res) => {
      this.detailsApplication = res.data;

      // get 'team application status
      let applicationStatus = this.detailsApplication[0].applicationStatus;
      this.detailsApplication[0].applicationStatusName = this.service.getStudentApplicationStatusName(applicationStatus);

      // projectId
      this.projectId = this.detailsApplication[0].projectId;


      //////////////////////////////////////////////////
      // get project details
      this.service.getSingleProject(this.projectId).subscribe((res) => {
        this.detailsProject = res.data;

        // Project status name
        this.detailsProject[0].projectStatusName = this.service.getProjectStatusName(this.detailsProject[0].projectStatus);

        // clientId
        this.clientId = this.detailsProject[0].clientId;

        //////////////////////////////////////////////////
        // get single client details
        this.service.getSingleClient(this.clientId).subscribe((res) => {
          this.detailsClient = res.data;
        });
      });
      //////////////////////////////////////////////////

    })

    // uploadFileListData
    this.service.getAllUploadFileByApplication(this.studentApplicationId).subscribe((res) => {
      console.log(res, '==> res');
      this.uploadFileListData = res.data;
    });

  }

  // form group
  StudentApplicationDetailsForm = new FormGroup({});

  // download file
  download(uploadFileId: any, saveFileName: any): any {
    // console.log(uploadFileId, '==> uploadFileId');

    this.service.downloadFile(uploadFileId).subscribe(
      data => saveAs(data, saveFileName),
      error => console.error(error)
    );
  }

  // upload (studentApplication)
  upload(event: any) {

    const file = event.target.files[0];

    const formdata = new FormData();
    formdata.append('uploadFile', file);
    formdata.append('connectTableName', 'studentapplication');
    formdata.append('connectTableId', this.studentApplicationId);

    this.httpClient
      .post(`${this.service.rootURL}/upload-file`, formdata)
      .subscribe(
        (val) => {
          console.log(val);
          const jsonVal = JSON.parse(JSON.stringify(val));
          // set uploadFileId
          // this.uploadFileId = jsonVal['uploadFileId'];

          // refresh page
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // 'Application List' button - go Apply Client Proposal page
  goStudentApplicaionList() {
    this.router.navigateByUrl(`/student-application-list`);
  }

}

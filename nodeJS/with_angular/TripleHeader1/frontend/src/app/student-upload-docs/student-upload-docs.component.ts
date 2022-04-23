import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from './../apiservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-student-upload-docs',
  templateUrl: './student-upload-docs.component.html',
  styleUrls: ['./student-upload-docs.component.css']
})
export class StudentUploadDocsComponent implements OnInit {

  errormsg: any;
  successmsg: any;
  teamId: any;
  uploadFileId: any;
  uploadFileListData: any;

  constructor(
    private service: ApiserviceService,
    private activatedRoute: ActivatedRoute,
    private HttpClient: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // check login status (student)
    this.service.checkLogin('student');

    // local Storage
    this.teamId = localStorage.getItem('teamId');

    // uploadFileListData
    this.service.getAllUploadFileByTeam(this.teamId).subscribe((res) => {
      console.log(res, '==> res');
      this.uploadFileListData = res.data;
    });
  }

  // form group
  ClientProposalDetailsForm = new FormGroup({
    'projectId': new FormControl('', [Validators.nullValidator]),
    'clientId': new FormControl('', [Validators.nullValidator]),
    'uploadFileId': new FormControl('', [Validators.nullValidator]),
  });

  // download file
  download(uploadFileId: any, saveFileName: any): any {
    // console.log(uploadFileId, '==> uploadFileId');

    this.service.downloadFile(uploadFileId).subscribe(
      data => saveAs(data, saveFileName),
      error => console.error(error)
    );
  }

  // upload
  upload(event: any) {

    const file = event.target.files[0];

    const formdata = new FormData();
    formdata.append('uploadFile', file);
    formdata.append('connectTableName', 'team');
    formdata.append('connectTableId', this.teamId);

    this.HttpClient
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
}

import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from './../apiservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-proposal-details',
  templateUrl: './client-proposal-details.component.html',
  styleUrls: ['./client-proposal-details.component.css']
})
export class ClientProposalDetailsComponent implements OnInit {

  errormsg: any;
  successmsg: any;
  projectId: any;
  clientId: any;
  uploadFileId: any;
  detailsData: any;
  uploadFileListData: any;
  appliedTeamsData: any;

  constructor(
    private service: ApiserviceService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {

    // check login status (client)
    this.service.checkLogin('client');

    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');

    this.service.getSingleProject(this.projectId).subscribe((res) => {
      console.log(res, '==> res');
      this.detailsData = res.data;
    });

    // uploadFileListData
    this.service.getAllUploadFileByProject(this.projectId).subscribe((res) => {
      console.log(res, '==> res');
      this.uploadFileListData = res.data;
    });

    // appliedTeamsData
    this.service.getAllAppliedTeamsByProject(this.projectId).subscribe((res) => {
      console.log(res, '==> res');
      this.appliedTeamsData = res.data;
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
    formdata.append('connectTableName', 'project');
    formdata.append('connectTableId', this.projectId);

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


  // select an applied Team
  selectAppliedTeam(id: any) {
    console.log(id, `select an applied team==>`);
    this.service.updateAppliedTeamAsSelect(id).subscribe((res: { message: any; }) => {
      console.log(res, "select an applied team==>");
      this.successmsg = res.message;
      this.refresh();
    });
  }

  // cancel an applied Team
  cancelAppliedTeam(id: any) {
    console.log(id, `cancel of selection for an applied team==>`);
    this.service.updateAppliedTeamAsCancel(id).subscribe((res: { message: any; }) => {
      console.log(res, "cancel of selection for an applied team==>");
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

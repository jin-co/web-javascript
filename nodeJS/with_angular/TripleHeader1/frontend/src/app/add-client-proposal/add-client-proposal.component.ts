import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-client-proposal',
  templateUrl: './add-client-proposal.component.html',
  styleUrls: ['./add-client-proposal.component.css']
})
export class AddClientProposalComponent implements OnInit {

  getparamid: any;
  errormsg: any;
  successmsg: any;
  projectId: any;
  clientId: any;
  uploadFileId: any;

  schoolTermListData: any;  // ex (W22, W21)
  programListData: any;     // program (CP, CPA, ...)

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private service: ApiserviceService
  ) { }

  ngOnInit(): void {
    // check login status (client)
    this.service.checkLogin('client');

    this.projectId = '';
    this.clientId = localStorage.getItem('clientId') || '';
    this.uploadFileId = '';

    // get all school term data
    this.service.getAllSchoolTermData().subscribe((res) => {
      this.schoolTermListData = res.data;
    });

    // get all program
    this.service.getAllProgram().subscribe((res) => {
      this.programListData = res.data;
    });

  }

  // form group
  addClientProposalForm = new FormGroup({
    'projectName': new FormControl('', [Validators.required, Validators.maxLength(100)]),
    'projectShortName': new FormControl('', [Validators.required, Validators.maxLength(50)]),

    'description': new FormControl('', [Validators.required]),
    'businessGoals': new FormControl('', [Validators.required]),
    'prerequisites': new FormControl('', [Validators.nullValidator]),
    'additionalNotes': new FormControl('', [Validators.nullValidator]),

    'schoolTermId': new FormControl('', [Validators.required]),
    'programCode': new FormControl('', [Validators.required]),

    'contactName': new FormControl('', [Validators.maxLength(50)]),
    'contactEmail': new FormControl('', [Validators.email, Validators.maxLength(40)]),
    'contactPhone': new FormControl('', [Validators.maxLength(15)]),
    'clientId': new FormControl('', [Validators.nullValidator]),
    'projectId': new FormControl('', [Validators.nullValidator]),
    'uploadFileId': new FormControl('', [Validators.nullValidator]),
    'uploadFile': new FormControl('', [Validators.nullValidator]),
  });

  // upload
  upload(event: any) {
    const file = event.target.files[0];
    const formdata = new FormData();
    formdata.append('uploadFile', file);
    formdata.append('connectTableName', 'project');   // project file

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

  // submit
  addClientProposalSubmit() {
    console.log(this.addClientProposalForm.value);
    // console.log(this.addClientProposalForm.get('projectName')?.value);

    if (this.addClientProposalForm.valid) {
      console.log(this.addClientProposalForm.value);

      this.service.createProject(this.addClientProposalForm.value).subscribe(
        (res) => {
          console.log(res, 'res=>');
          this.addClientProposalForm.reset();
          this.successmsg = res.message;

          console.log(res);
          const jsonVal = JSON.parse(JSON.stringify(res));
          this.projectId = jsonVal['insertId'];
          this.uploadFileId = jsonVal['uploadFileId'];

          // local storage
          localStorage.setItem('insertId', res.data['insertId']);

          // Go to page (ex. http://localhost:4200/client-proposal-list)          
          this.router.navigateByUrl('/client-proposal-list');
        },
        err => {
          console.error(err);
        }
      );
    }
    else {
      this.errormsg = 'Please enter valid values';
    }
  }

  // **on cancel button click go back to th main
  onCancelClick() {
    this.router.navigateByUrl('/');
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-client-proposal-edit',
  templateUrl: './add-client-proposal-edit.component.html',
  styleUrls: ['./add-client-proposal-edit.component.css']
})
export class AddClientProposalEditComponent implements OnInit {

  errormsg: any;
  successmsg: any;

  projectId: any;
  clientId: any;

  detailsData: any;

  schoolTermListData: any;  // ex (W22, W21)
  programListData: any;     // program (CP, CPA, ...)

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private service: ApiserviceService
  ) { }

  ngOnInit(): void {

    // check login status (client)
    this.service.checkLogin('client');

    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');

    // get single project
    this.service.getSingleProject(this.projectId).subscribe((res) => {
      console.log(res, '==> res');
      this.detailsData = res.data;

      // set value to the edit form
      this.editClientProposalForm.patchValue({
        projectId: this.detailsData[0].projectId,
        clientId: this.detailsData[0].clientId,

        projectName: this.detailsData[0].projectName,
        projectShortName: this.detailsData[0].projectShortName,
        description: this.detailsData[0].description,
        businessGoals: this.detailsData[0].businessGoals,
        prerequisites: this.detailsData[0].prerequisites,
        additionalNotes: this.detailsData[0].additionalNotes,

        schoolTermId: this.detailsData[0].schoolTermId,
        programCode: this.detailsData[0].programCode,

        contactName: this.detailsData[0].contactName,
        contactEmail: this.detailsData[0].contactEmail,
        contactPhone: this.detailsData[0].contactPhone
      });
    });

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
  editClientProposalForm = new FormGroup({
    'projectId': new FormControl('', [Validators.required]),
    'clientId': new FormControl('', [Validators.required]),

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
    'contactPhone': new FormControl('', [Validators.maxLength(15)])
  });


  // editClientProposalSubmit
  editClientProposalSubmit() {
    if (this.editClientProposalForm.valid) {
      this.service.updateProject(this.editClientProposalForm.value, this.projectId).subscribe((res) => {
        alert('proposal changed successfully.');

        // Go to the proposal list page
        this.router.navigateByUrl('/client-proposal-list');
      },
        err => {
          console.error(err);
        });
    }
    else {
      this.errormsg = 'Please enter valid values';
    }
  }

  // **on cancel button click go back to th main
  onCancelClick() {
    this.router.navigateByUrl('/client-proposal-list');
  }
}

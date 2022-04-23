import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-coordinator-assign-faculty',
  templateUrl: './coordinator-assign-faculty.component.html',
  styleUrls: ['./coordinator-assign-faculty.component.css']
})
export class CoordinatorAssignFacultyComponent implements OnInit {

  errormsg: any;
  successmsg: any;

  studentapplicationId: any;
  projectId: any;

  detailsData: any;
  detailsClient: any;

  adviserListData: any;

  applied: boolean = false;

  constructor(private service: ApiserviceService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router) { }

  ngOnInit(): void {

    // check login status (coordinator)
    this.service.checkLogin('coordinator');

    // paramater
    this.studentapplicationId = this.activatedRoute.snapshot.paramMap.get('id');

    // get student application details
    this.service.getStudentApplicationDetails(this.studentapplicationId).subscribe((res) => {
      console.log(res, '==> res');
      this.detailsData = res.data;

      this.projectId = res.data[0].projectId;

      // set value to the edit form
      this.assignFacultyForm.patchValue({
        studentapplicationId: this.detailsData[0].studentapplicationId,
        adviserId: this.detailsData[0].adviserId
      });
    });

    // get adviser list data
    this.service.getAllAdviserData().subscribe((res) => {
      this.adviserListData = res.data;
    });
  }

  // form group
  assignFacultyForm = new FormGroup({
    'studentapplicationId': new FormControl('', [Validators.required]),
    'adviserId': new FormControl('', [Validators.required])
  });

  // updateFacultySubmit
  updateFacultySubmit() {
    if (this.assignFacultyForm.valid) {
      this.service.updateAssignedFaculty(this.assignFacultyForm.value, this.studentapplicationId).subscribe((res) => {
        alert('Faculty adviser assigned successfully.');

        // Go to the project details page
        this.router.navigateByUrl('/coordinator-project-details/' + this.projectId);
      },
        err => {
          console.error(err);
        });
    }
    else {
      this.errormsg = 'Please choose the value';
    }
  }

  //  Go to details
  onProjectDetails() {
    this.router.navigateByUrl('/coordinator-project-details/' + this.projectId);
  }

}

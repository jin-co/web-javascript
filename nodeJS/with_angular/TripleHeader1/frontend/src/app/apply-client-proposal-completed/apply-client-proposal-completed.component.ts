import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-apply-client-proposal-completed',
  templateUrl: './apply-client-proposal-completed.component.html',
  styleUrls: ['./apply-client-proposal-completed.component.css']
})
export class ApplyClientProposalCompletedComponent implements OnInit {

  studentApplicationId: any;
  projectId: any;

  detailsApplication: any;

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
    this.studentApplicationId = this.activatedRoute.snapshot.queryParams['studentApplicationId'];

    // Get Studetn Application details
    this.service.getSingleApplication(this.studentApplicationId).subscribe((res) => {
      this.detailsApplication = res.data;
    });

  }


  // 'Confirm' button - go Student Application List page
  goStudentApplicationList() {
    this.router.navigateByUrl(`/student-application-list`);
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-coordinator-project-list',
  templateUrl: './coordinator-project-list.component.html',
  styleUrls: ['./coordinator-project-list.component.css']
})
export class CoordinatorProjectListComponent implements OnInit {

  listData: any;

  constructor(
    private service: ApiserviceService
  ) { }

  ngOnInit(): void {
    // check login status (coordinator)
    this.service.checkLogin('coordinator');

    // get all project by current school term
    this.service.getAllProjectByCurrentTerm().subscribe((res) => {
      this.listData = res.data;
    });
  }

}

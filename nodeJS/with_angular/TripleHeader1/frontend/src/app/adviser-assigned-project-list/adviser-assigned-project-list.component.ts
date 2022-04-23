import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-adviser-assigned-project-list',
  templateUrl: './adviser-assigned-project-list.component.html',
  styleUrls: ['./adviser-assigned-project-list.component.css']
})
export class AdviserAssignedProjectListComponent implements OnInit {

  adviserId: any;
  listData: any;

  constructor(
    private service: ApiserviceService
  ) { }

  ngOnInit(): void {
    // check login status (adviser)
    this.service.checkLogin('adviser');

    this.adviserId = localStorage.getItem('adviserId') || '';
    console.log(this.adviserId);


    // get all assigned project by adviser
    this.service.getAllProjectByAdiviser(this.adviserId).subscribe((res) => {
      this.listData = res.data;
    });

  }

}

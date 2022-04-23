import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-client-proposal-list',
  templateUrl: './client-proposal-list.component.html',
  styleUrls: ['./client-proposal-list.component.css']
})
export class ClientProposalListComponent implements OnInit {

  clientId: any;
  listData: any;

  constructor(
    private service: ApiserviceService
  ) { }

  ngOnInit(): void {
    // check login status (client)
    this.service.checkLogin('client');

    this.clientId = localStorage.getItem('clientId') || '';

    this.service.getAllProjectByClient(this.clientId).subscribe((res) => {
      console.log(res, '==> res');
      this.listData = res.data;
    })
  }
}

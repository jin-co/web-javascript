import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Modes } from 'src/enums/modes';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {  
  constructor() {}

  ngOnInit(): void {

  }

  onClick(form: NgForm) {

  }
}

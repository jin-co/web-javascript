import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import { ActivatedRoute } from '@angular/router'; '@angular/router';
import { interval, lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-student-team',
  templateUrl: './add-student-team.component.html',
  styleUrls: ['./add-student-team.component.css']
})
export class AddStudentTeamComponent implements OnInit {

  readAllStudenDataPerTeam:any;
  readAllStudenData:any;
  readSchoolTermData:any;
  readCourseCodeData:any;
  readTeamData:any;

  errormsg: any;
  successmsg: any;

  getparamid:any;

  selectedValue: any;

  selectedSchoolTermValue: any;

  schoolTermSelectModel = 2; //W22 default value
  courseCodeSelectModel = 2; //CPA default value

  teamIdVal:any;

  constructor(private service:ApiserviceService, private router:ActivatedRoute) {
  }

  changeSchoolTermDropDown(e: any){
    // this.selectedSchoolTermValue =  e.target.value;
    // console.log(e.target.value);
  }

  changeCourseCodeDropDown(e: any){
    // console.log(e.target.value);
  }

  changeStudent1DropDown(e: any){
    // console.log(e.target.value);
  }

  ngOnInit(): void {
    
    this.service.getAllStudentData().subscribe((res)=>{
      // console.log(res, "res==>");
      this.readAllStudenData = res.data;
    });

    this.service.getAllSchoolTermData().subscribe((res)=>{
      // console.log(res, "res==>");
      this.readSchoolTermData = res.data;
    });

    this.service.getAllCourseCodeData().subscribe((res)=>{
      // console.log(res, "res==>");
      this.readCourseCodeData = res.data;
    });

  }

  teamForm = new FormGroup({
    'schoolTerm': new FormControl('', Validators.required),
    'courseCode': new FormControl('', Validators.required),
    'studentTeamName': new FormControl('', Validators.required)
  });

  addingStudentForm = new FormGroup({
    'teamIdFormControl': new FormControl('', Validators.required),
    'student1FormControl': new FormControl('', Validators.required),
    'teamIdGeneratedFormControl': new FormControl('', Validators.required),
  });

  async teamSubmit(){
    // console.log(this,this.teamForm.value);
    // this.teamForm.value.schoolTermId = this.selectedSchoolTermValue;

    if(this.teamForm.valid){
      // console.log(this.teamForm.value);

      this.service.createTeamData(this.teamForm.value).subscribe(async (res) => {

        this.ngOnInit();

        const addinterval1 = interval(200).pipe(take(5));
        await lastValueFrom(addinterval1);

        this.ngOnInit();

        const addinterval2 = interval(200).pipe(take(5));
        await lastValueFrom(addinterval2);

        this.successmsg = res.message;

      });
      this.ngOnInit();
    }
    else{
      this.errormsg = 'All fields are required';
    }

    this.ngOnInit();

    const addinterval4 = interval(200).pipe(take(5));
    await lastValueFrom(addinterval4);

    const teamName = this.teamForm.value.studentTeamName;
    this.service.getAllTeamData(teamName).subscribe((res)=>{

      this.ngOnInit();

      this.addingStudentForm.patchValue({
        teamIdFormControl:res.data[0].teamId,
        teamIdGeneratedFormControl:res.data[0].teamIdGenerated

      });

      this.ngOnInit();

    });

    this.ngOnInit();
  }

  async studentSubmit(){

    if(this.addingStudentForm.valid){

      this.service.updateTeamToStudents(this.addingStudentForm.value).subscribe(async (res)=>{
        // console.log(res, 'res=>');
      this.successmsg = res.message;
      });

      this.teamIdVal = this.addingStudentForm.value.teamIdFormControl;

      const addinterval3 = interval(200).pipe(take(5));
      await lastValueFrom(addinterval3);

      this.showUpdatedStudentList();

    }
    else{
      this.errormsg = 'All fields are required';
    }

  }

  showUpdatedStudentList(){

    const teamIdVal = this.teamIdVal;
    this.service.getAllStudentDataPerTeam(teamIdVal).subscribe((res)=>{
      // console.log(res, "res==>");
      this.readAllStudenDataPerTeam = res.data;
    });
  }
}

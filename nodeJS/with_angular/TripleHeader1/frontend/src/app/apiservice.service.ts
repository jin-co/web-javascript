import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http: HttpClient, private router: Router) { }

  rootURL = '/api';

  //This url is used for development, should delete content in proxy.conf.json
  //rootURL = 'http://localhost:3000/api';

  //get all student data
  getAllStudentData(): Observable<any> {
    return this._http.get(`${this.rootURL}/add-student-team`);
  }

  //get all student data per team
  getAllStudentDataPerTeam(id: any): Observable<any> {
    let ids = id;
    return this._http.get(`${this.rootURL}/add-student-team-all-student-per-team/${ids}`);
  }

  //get team data
  getAllTeamData(id: any): Observable<any> {
    let ids = id;
    return this._http.get(`${this.rootURL}/add-student-team-teamData/${ids}`);
  }

  //create team data
  createTeamData(data: any): Observable<any> {
    console.log(data, 'createapi=>')
    return this._http.post(`${this.rootURL}/add-student-team`, data);
  }

  //get all schoolTerm data
  getAllSchoolTermData(): Observable<any> {
    return this._http.get(`${this.rootURL}/add-student-team-schoolterm`);
  }

  //set current schoolTerm
  setCurrentSchoolTerm(id: any): Observable<any> {
    let ids = id;
    return this._http.delete(`${this.rootURL}/set-current-schoolterm/${ids}`);
  }

  //get all coursecode data
  getAllCourseCodeData(): Observable<any> {
    return this._http.get(`${this.rootURL}/add-student-team-coursecode`);
  }

  //create team data
  updateTeamToStudents(data: any): Observable<any> {
    console.log(data, 'createapi=>')
    return this._http.post(`${this.rootURL}/add-student-team-to-student`, data);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Adviser

  //get adviser list data
  getAllAdviserData(): Observable<any> {
    return this._http.get(`${this.rootURL}/adviser`);
  }


  ////////////////////////////////////////////////////////////////////////////////
  // Program
  getAllProgram(): Observable<any> {
    return this._http.get(`${this.rootURL}/program`);
  }


  ////////////////////////////////////////////////////////////////////////////////
  // Client

  // get all client
  getAllClient(): Observable<any> {
    return this._http.get(`${this.rootURL}/client`);
  }

  // get single client
  getSingleClient(id: any): Observable<any> {
    let ids = id;
    return this._http.get(`${this.rootURL}/client/${ids}`);
  }

  // create client
  createClient(data: any): Observable<any> {
    console.log(data, 'createapi =>');
    return this._http.post(`${this.rootURL}/client`, data);
  }

  // update client
  updateClient(data: any, id: any): Observable<any> {
    let ids = id;
    return this._http.put(`${this.rootURL}/client/${ids}`, data);
  }

  // delete client
  deleteClient(id: any): Observable<any> {
    let ids = id;
    return this._http.delete(`${this.rootURL}/client/${ids}`);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Project

  // get all project
  getAllProject(): Observable<any> {
    return this._http.get(`${this.rootURL}/project`);
  }

  // get all project by client
  getAllProjectByClient(clientId: any): Observable<any> {
    return this._http.get(`${this.rootURL}/project?clientId=${clientId}`);
  }

  // get all project by current school term
  getAllProjectByCurrentTerm(): Observable<any> {
    return this._http.get(`${this.rootURL}/project-list-current-term`);
  }

  // get all assigned project by adviser
  getAllProjectByAdiviser(adviserId: any): Observable<any> {
    return this._http.get(`${this.rootURL}/project-list-adviser?adviserId=${adviserId}`);
  }

  // get single project
  getSingleProject(id: any): Observable<any> {
    let ids = id;
    return this._http.get(`${this.rootURL}/project/${ids}`);
  }

  // get all project list with client info
  getProjectListByProjectStatus(projectStatus: any): Observable<any> {
    return this._http.get(`${this.rootURL}/project-list-by-project-status?projectStatus=${projectStatus}`);
  }

  // get application status to project
  getProjectTeamApplicationStatus(projectId: any, teamId: any): Observable<any> {
    return this._http.get(`${this.rootURL}/project-team-application-status?projectId=${projectId}&teamId=${teamId}`);
  }

  // get all applied teams by project
  getAllAppliedTeamsByProject(id: any): Observable<any> {
    let ids = id;
    return this._http.get(`${this.rootURL}/project-all-applied-teams/${ids}`);
  }

  // update student application as selected
  updateAppliedTeamAsSelect(id: any): Observable<any> {
    let ids = id;
    return this._http.delete(`${this.rootURL}/project-update-selected-team/${ids}`);
  }

  // update student application as selected
  updateAppliedTeamAsCancel(id: any): Observable<any> {
    let ids = id;
    return this._http.delete(`${this.rootURL}/project-cancel-selected-team/${ids}`);
  }

  // create project
  createProject(data: any): Observable<any> {
    console.log(data, 'createapi =>');
    return this._http.post(`${this.rootURL}/project`, data);
  }

  // update project
  updateProject(data: any, id: any): Observable<any> {
    let ids = id;
    return this._http.put(`${this.rootURL}/project/${ids}`, data);
  }

  // delete project
  deleteProject(id: any): Observable<any> {
    let ids = id;
    return this._http.delete(`${this.rootURL}/project/${ids}`);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Student Application

  // create application
  createApplication(data: any): Observable<any> {
    console.log(data, 'createapi =>');
    return this._http.post(`${this.rootURL}/application`, data);
  }

  // get single application
  getSingleApplication(id: any): Observable<any> {
    let ids = id;
    return this._http.get(`${this.rootURL}/application/${ids}`);
  }

  // get student application details
  getStudentApplicationDetails(id: any): Observable<any> {
    let ids = id;
    return this._http.get(`${this.rootURL}/application-details/${ids}`);
  }

  // get application list by team
  getAllApplicationByTeam(teamId: any): Observable<any> {
    return this._http.get(`${this.rootURL}/application-by-team/${teamId}`);
  }

  // update updateAssignedFaculty on application
  updateAssignedFaculty(data: any, id: any): Observable<any> {
    let ids = id;
    return this._http.put(`${this.rootURL}/application-adviser/${ids}`, data);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Coordinator Menus

  // get student team list with join tables
  getStudentTeamListWithData(termName: any): Observable<any> {
    const _termName = termName;
    return this._http.get(`${this.rootURL}/student-team-list-for-coorinator/${_termName}`);
  }



  ////////////////////////////////////////////////////////////////////////////////
  // Upload files
  // get all uploadfile by project
  getAllUploadFileByProject(projectId: any): Observable<any> {
    return this._http.get(`${this.rootURL}/uploadfile?projectId=${projectId}`);
  }

  // get all uploadfile by team
  getAllUploadFileByTeam(teamId: any): Observable<any> {
    return this._http.get(`${this.rootURL}/uploadfile?teamId=${teamId}`);
  }


  // get all uploadfile by application
  getAllUploadFileByApplication(studentApplicationId: any): Observable<any> {
    return this._http.get(`${this.rootURL}/uploadfile?studentApplicationId=${studentApplicationId}`);
  }

  // download file
  downloadFile(uploadFileId: any): Observable<any> {

    // ex. http://localhost:3000/downloadfile/
    /*
    {
        "uploadFileId": "8"
    }
    */
    const body = { 'uploadFileId': uploadFileId };
    return this._http.post(`${this.rootURL}/downloadfile`, body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }


  ////////////////////////////////////////////////////////////////////////////////
  // Constants (DB)

  // Get Project Status Name
  public getProjectStatusName(_projectStatus: any): string {
    let projectStatusArray: string[] = [
      '',
      'Registered',
      'Available',
      'InProgress',
      'Matched',
      'Taken'
    ];

    return projectStatusArray[_projectStatus];
  }

  // Get Student Application Status Name
  public getStudentApplicationStatusName(_applicationStatus: any): string {
    let studentApplicationStatusArray: string[] = [
      '',
      'Registered',
      'Selected',
      'Approved',
      'Assigned'
    ];

    return _applicationStatus ? studentApplicationStatusArray[_applicationStatus] : 'Not appliyed';
  }


  ////////////////////////////////////////////////////////////////////////////////
  // Utils

  // get login status
  public isLogin(_usertype: string): Observable<boolean> {

    // User type
    const userType = localStorage.getItem('userType');

    // Client
    if (_usertype === 'client') {

      if (_usertype !== userType) {
        return of(false);
      }

      const clientId = localStorage.getItem('clientId');
      const clientName = localStorage.getItem('clientName');
      const email = localStorage.getItem('email');

      if (clientId == null || clientId === "" ||
        clientName == null || clientName === "" ||
        email == null || email === "") {
        return of(false);
      }
      else {
        return of(true);
      }
    }

    // Student
    if (_usertype === 'student') {
      if (_usertype !== userType) {
        return of(false);
      }

      const studentId = localStorage.getItem('studentId');
      const studentFirstName = localStorage.getItem('studentFirstName');
      const studentLastName = localStorage.getItem('studentLastName');
      const teamId = localStorage.getItem('teamId');

      if (studentId == null || studentId === "" ||
        studentFirstName == null || studentFirstName === "" ||
        studentLastName == null || studentLastName === "" ||
        teamId == null || teamId === "") {
        return of(false);
      }

      return of(true);
    }

    // Adviser
    if (_usertype === 'adviser') {
      if (_usertype !== userType) {
        return of(false);
      }

      const adviserId = localStorage.getItem('adviserId');
      const adviserFirstName = localStorage.getItem('adviserFirstName');
      const adviserLastName = localStorage.getItem('adviserLastName');
      const adviserEmail = localStorage.getItem('adviserEmail');

      if (adviserId == null || adviserId === "" ||
        adviserFirstName == null || adviserFirstName === "" ||
        adviserLastName == null || adviserLastName === "" ||
        adviserEmail == null || adviserEmail === "") {
        return of(false);
      }

      return of(true);
    }

    // Coordinator
    if (_usertype === 'coordinator') {
      if (_usertype !== userType) {
        return of(false);
      }

      const coordinatorId = localStorage.getItem('coordinatorId');
      const coordinatorFirstName = localStorage.getItem('coordinatorFirstName');
      const coordinatorLastName = localStorage.getItem('coordinatorLastName');
      const coordinatorEmail = localStorage.getItem('coordinatorEmail');

      if (coordinatorId == null || coordinatorId === "" ||
        coordinatorFirstName == null || coordinatorFirstName === "" ||
        coordinatorLastName == null || coordinatorLastName === "" ||
        coordinatorEmail == null || coordinatorEmail === "") {
        return of(false);
      }

      return of(true);
    }

    // Client, Student, Adviser, Coordinator
    if (_usertype === 'any') {
      if (userType === 'client' || userType === 'student' || userType === 'adviser' || userType === 'coordinator') {
        return of(true);
      }
      else {
        return of(false);
      }
    }

    return of(false);
  }

  // check login status
  public checkLogin(_usertype: string): boolean {

    // Client
    if (_usertype === 'client') {
      if (!this.isLogin(_usertype)) {
        this.router.navigateByUrl('/client-login');
        return false;
      }
    }

    // Student
    if (_usertype === 'student') {
      if (!this.isLogin(_usertype)) {
        this.router.navigateByUrl('/student-login');
        return false;
      }
    }

    // Adviser
    if (_usertype === 'adviser') {
      if (!this.isLogin(_usertype)) {
        this.router.navigateByUrl('/adviser-login');
        return false;
      }
    }

    // Coordinator
    if (_usertype === 'coordinator') {
      if (!this.isLogin(_usertype)) {
        this.router.navigateByUrl('/coordinator-login');
        return false;
      }
    }

    return true;
  }

  // client login
  public clientLogin(data: any): Observable<any> {
    console.log(data, 'client-login =>');
    return this._http.post(`${this.rootURL}/client-login`, data);
  }

  // set login client
  public setLoginClient(_clientId: string, _clientName: string, _email: string): void {
    window.localStorage.clear();

    localStorage.setItem('userType', 'client');
    localStorage.setItem('clientId', _clientId);
    localStorage.setItem('clientName', _clientName);
    localStorage.setItem('email', _email);
  }

  // student login
  public studentLogin(data: any): Observable<any> {
    console.log(data, 'student-login =>');
    return this._http.post(`${this.rootURL}/student-login`, data);
  }

  // set login student
  public setLoginStudent(_studentId: string, _studentFirstName: string, _studentLastName: string, _teamId: string): void {
    window.localStorage.clear();

    localStorage.setItem('userType', 'student');
    localStorage.setItem('studentId', _studentId);
    localStorage.setItem('studentFirstName', _studentFirstName);
    localStorage.setItem('studentLastName', _studentLastName);
    localStorage.setItem('teamId', _teamId);
  }

  // adviser login
  public adviserLogin(data: any): Observable<any> {
    console.log(data, 'adviser-login =>');
    return this._http.post(`${this.rootURL}/adviser-login`, data);
  }

  // set login adviser
  public setLoginAdviser(_adviserId: string, _adviserFirstName: string, _adviserLastName: string, _adviserEmail: string): void {
    window.localStorage.clear();

    localStorage.setItem('userType', 'adviser');
    localStorage.setItem('adviserId', _adviserId);
    localStorage.setItem('adviserFirstName', _adviserFirstName);
    localStorage.setItem('adviserLastName', _adviserLastName);
    localStorage.setItem('adviserEmail', _adviserEmail);
  }

  // coordinator login
  public coordinatorLogin(data: any): Observable<any> {
    console.log(data, 'coordinator-login =>');
    return this._http.post(`${this.rootURL}/coordinator-login`, data);
  }

  // set login coordinator
  public setLoginCoordinator(_coordinatorId: string, _coordinatorFirstName: string, _coordinatorLastName: string, _coordinatorEmail: string): void {
    window.localStorage.clear();

    localStorage.setItem('userType', 'coordinator');
    localStorage.setItem('coordinatorId', _coordinatorId);
    localStorage.setItem('coordinatorFirstName', _coordinatorFirstName);
    localStorage.setItem('coordinatorLastName', _coordinatorLastName);
    localStorage.setItem('coordinatorEmail', _coordinatorEmail);
  }


  // logout
  public logout(): void {
    // delete all local storage value
    window.localStorage.clear();
    this.router.navigateByUrl('/');
  }
  ////////////////////////////////////////////

  //get all data
  getAllData(): Observable<any> {
    return this._http.get(`${this.rootURL}/user`);
  }

  //create data
  createData(data: any): Observable<any> {
    console.log(data, 'createapi=>')
    return this._http.post(`${this.rootURL}/user`, data);
  }

  //delete data
  deleteData(id: any): Observable<any> {
    let ids = id;
    return this._http.delete(`${this.rootURL}/user/${ids}`);
  }

  //update data
  updateData(data: any, id: any): Observable<any> {
    let ids = id;
    return this._http.put(`${this.rootURL}/user/${ids}`, data);
  }

  //getsingledata
  getSingleData(id: any): Observable<any> {
    let ids = id;
    return this._http.get(`${this.rootURL}/user/${ids}`);
  }

}

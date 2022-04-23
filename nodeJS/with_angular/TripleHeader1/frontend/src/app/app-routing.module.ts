import { AddClientProposalEditComponent } from './add-client-proposal-edit/add-client-proposal-edit.component';
import { CoordinatorTeamListComponent } from './coordinator-team-list/coordinator-team-list.component';
import { ClientProposalDetailsComponent } from './client-proposal-details/client-proposal-details.component';
import { ClientProposalListComponent } from './client-proposal-list/client-proposal-list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { AddClientProposalComponent } from './add-client-proposal/add-client-proposal.component';
import { AddStudentTeamComponent } from './add-student-team/add-student-team.component';
import { ApplyClientProposalComponent } from './apply-client-proposal/apply-client-proposal.component';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { ClientLoginComponent } from './logIns/client-login/client-login.component';
import { LoginComponent } from './logins/login/login.component';
import { MainComponent } from './main/main.component';
import { ClientUploadDocsComponent } from './client-upload-docs/client-upload-docs.component';
import { StudentUploadDocsComponent } from './student-upload-docs/student-upload-docs.component';
import { StudentLoginComponent } from './logins/student-login/student-login.component';
import { ApplyClientProposalDetailsComponent } from './apply-client-proposal-details/apply-client-proposal-details.component';
import { ApplyClientProposalAddComponent } from './apply-client-proposal-add/apply-client-proposal-add.component';
import { ApplyClientProposalCompletedComponent } from './apply-client-proposal-completed/apply-client-proposal-completed.component';
import { StudentApplicationListComponent } from './student-application-list/student-application-list.component';
import { StudentApplicationDetailsComponent } from './student-application-details/student-application-details.component';
import { CoordinatorLoginComponent } from './logins/coordinator-login/coordinator-login.component';
import { AdviserLoginComponent } from './logins/adviser-login/adviser-login.component';
import { CoordinatorSchooltermListComponent } from './coordinator-schoolterm-list/coordinator-schoolterm-list.component';
import { CoordinatorProjectListComponent } from './coordinator-project-list/coordinator-project-list.component';
import { CoordinatorProjectDetailsComponent } from './coordinator-project-details/coordinator-project-details.component';
import { CoordinatorAssignFacultyComponent } from './coordinator-assign-faculty/coordinator-assign-faculty.component';
import { AdviserAssignedProjectListComponent } from './adviser-assigned-project-list/adviser-assigned-project-list.component';
import { AdviserAssignedProjectDetailsComponent } from './adviser-assigned-project-details/adviser-assigned-project-details.component';

const routes: Routes = [
  { path: 'add-client-proposal', component: AddClientProposalComponent },
  { path: 'client-proposal-list', component: ClientProposalListComponent },
  { path: 'client-proposal-details/:id', component: ClientProposalDetailsComponent },
  { path: 'add-client-proposal-edit/:id', component: AddClientProposalEditComponent },

  { path: 'add-student-team', component: AddStudentTeamComponent },
  { path: 'apply-client-proposal', component: ApplyClientProposalComponent },
  { path: 'apply-client-proposal-details', component: ApplyClientProposalDetailsComponent },
  { path: 'apply-client-proposal-add', component: ApplyClientProposalAddComponent },
  { path: 'apply-client-proposal-completed', component: ApplyClientProposalCompletedComponent },

  { path: 'student-application-list', component: StudentApplicationListComponent },
  { path: 'student-application-details/:id', component: StudentApplicationDetailsComponent },

  { path: 'adviser-assigned-project-list', component: AdviserAssignedProjectListComponent },
  { path: 'adviser-assigned-project-details/:id', component: AdviserAssignedProjectDetailsComponent },

  { path: 'coordinator-project-list', component: CoordinatorProjectListComponent },
  { path: 'coordinator-project-details/:id', component: CoordinatorProjectDetailsComponent },
  { path: 'coordinator-assign-faculty/:id', component: CoordinatorAssignFacultyComponent },
  { path: 'coordinator-team-list', component: CoordinatorTeamListComponent },
  { path: 'coordinator-schoolterm-list', component: CoordinatorSchooltermListComponent },

  { path: '', component: MainComponent },
  { path: 'client-register', component: ClientRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'client-login', component: ClientLoginComponent },
  { path: 'student-login', component: StudentLoginComponent },
  { path: 'adviser-login', component: AdviserLoginComponent },
  { path: 'coordinator-login', component: CoordinatorLoginComponent },

  { path: 'client-upload-docs', component: ClientUploadDocsComponent },
  { path: 'student-upload-docs', component: StudentUploadDocsComponent },

  { path: 'create', component: CreateComponent },
  { path: 'create/:id', component: CreateComponent },
  { path: 'read', component: ReadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

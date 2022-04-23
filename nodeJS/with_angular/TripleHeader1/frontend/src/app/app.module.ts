import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';

import { HttpClientModule } from '@angular/common/http';
import { ApiserviceService } from './apiservice.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AddClientProposalComponent } from './add-client-proposal/add-client-proposal.component';
import { AddStudentTeamComponent } from './add-student-team/add-student-team.component';
import { ApplyClientProposalComponent } from './apply-client-proposal/apply-client-proposal.component';
import { ClientProposalListComponent } from './client-proposal-list/client-proposal-list.component';
import { ClientRegisterComponent } from './client-register/client-register.component';
import { ClientProposalDetailsComponent } from './client-proposal-details/client-proposal-details.component';
import { FooterComponent } from './footer/footer.component';
import { ClientLoginComponent } from './logIns/client-login/client-login.component';
import { MainComponent } from './main/main.component';
import { ClientUploadDocsComponent } from './client-upload-docs/client-upload-docs.component';
import { StudentUploadDocsComponent } from './student-upload-docs/student-upload-docs.component';
import { LoginComponent } from './logins/login/login.component';
import { StudentLoginComponent } from './logins/student-login/student-login.component';
import { ApplyClientProposalDetailsComponent } from './apply-client-proposal-details/apply-client-proposal-details.component';
import { ApplyClientProposalAddComponent } from './apply-client-proposal-add/apply-client-proposal-add.component';
import { ApplyClientProposalCompletedComponent } from './apply-client-proposal-completed/apply-client-proposal-completed.component';
import { StudentApplicationListComponent } from './student-application-list/student-application-list.component';
import { StudentApplicationDetailsComponent } from './student-application-details/student-application-details.component';

// angular materials
import { MatTreeModule } from '@angular/material/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { CoordinatorLoginComponent } from './logins/coordinator-login/coordinator-login.component';
import { CoordinatorTeamListComponent } from './coordinator-team-list/coordinator-team-list.component';
import { AdviserLoginComponent } from './logins/adviser-login/adviser-login.component';
import { CoordinatorSchooltermListComponent } from './coordinator-schoolterm-list/coordinator-schoolterm-list.component';
import { AddClientProposalEditComponent } from './add-client-proposal-edit/add-client-proposal-edit.component';
import { CoordinatorProjectListComponent } from './coordinator-project-list/coordinator-project-list.component';
import { CoordinatorProjectDetailsComponent } from './coordinator-project-details/coordinator-project-details.component';
import { CoordinatorAssignFacultyComponent } from './coordinator-assign-faculty/coordinator-assign-faculty.component';
import { AdviserAssignedProjectListComponent } from './adviser-assigned-project-list/adviser-assigned-project-list.component';
import { AdviserAssignedProjectDetailsComponent } from './adviser-assigned-project-details/adviser-assigned-project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ReadComponent,
    HeaderComponent,
    AddClientProposalComponent,
    AddStudentTeamComponent,
    ApplyClientProposalComponent,
    ClientProposalListComponent,
    ClientRegisterComponent,
    ClientProposalDetailsComponent,
    FooterComponent,
    ClientLoginComponent,
    MainComponent,
    ClientUploadDocsComponent,
    StudentUploadDocsComponent,
    LoginComponent,
    StudentLoginComponent,
    ApplyClientProposalDetailsComponent,
    ApplyClientProposalAddComponent,
    ApplyClientProposalCompletedComponent,
    StudentApplicationListComponent,
    StudentApplicationDetailsComponent,
    CoordinatorLoginComponent,
    CoordinatorTeamListComponent,
    AdviserLoginComponent,
    CoordinatorSchooltermListComponent,
    AddClientProposalEditComponent,
    CoordinatorProjectListComponent,
    CoordinatorProjectDetailsComponent,
    CoordinatorAssignFacultyComponent,
    AdviserAssignedProjectListComponent,
    AdviserAssignedProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTreeModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

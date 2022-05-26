import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular materials
// import { MatInputModule } from '@angular/material/input';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/shared/header/header.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/singup/singup.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { ErrorComponent } from './components/shared/error/error.component';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // MatInputModule,
    // MatCardModule,
    // MatButtonModule,
    // MatToolbarModule,
    // MatExpansionModule,
    // MatProgressSpinnerModule,
    // MatPaginatorModule,
    // MatDialogModule
    AngularMaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent] // this is a way to let angular detect a component when a component is not registered using a selector of in a routing module
})
export class AppModule {}

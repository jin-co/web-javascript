import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth.guard';


import { LoginComponent } from './components/auth/login/login.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
  {
    path: 'edit/:id',
    component: PostCreateComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],  
  providers: [AuthGuard]
})
export class AppRoutingModule {}

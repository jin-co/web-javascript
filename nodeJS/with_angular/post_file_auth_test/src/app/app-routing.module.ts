import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';

const routes: Routes = [
  {path: '', component:PostListComponent},
  {path: 'create', component:PostCreateComponent},
  {path: 'edit/:id', component:PostCreateComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
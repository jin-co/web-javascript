import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/singup/singup.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { AuthGuard } from './services/authGuard';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { 
    path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] 
  },
  {
    path: 'edit/:id',
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard], // can add services to a specific module like this
})
export class AppRoutingModule {}

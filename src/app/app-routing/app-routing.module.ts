import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { RoleGuard } from '../_guards/role.guard';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { VideosComponent } from '../videos/videos.component';
import { ProfilesComponent } from '../profiles/profiles.component';
import { VideoskidComponent } from '../videoskid/videoskid.component';
import { EmailVerificacionComponent } from '../email-verificacion/email-verificacion.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'videos', component: VideosComponent, canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'admin' }
  },
  {
    path: 'profiles', component: ProfilesComponent, canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'admin' }
  },

  {
    path: 'videoskid', component: VideoskidComponent, canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'guest' }
  },
  {
    path: 'email_verificacion/:code', component: EmailVerificacionComponent 
  }

];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }

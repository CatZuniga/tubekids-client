import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VideosComponent } from './videos/videos.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { VideoskidComponent } from './videoskid/videoskid.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';

import { YoutubePlayerModule } from 'ngx-youtube-player';
import { EmailVerificacionComponent } from './email-verificacion/email-verificacion.component';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    LoginComponent,
    RegisterComponent,
    VideosComponent,
    ProfilesComponent,
    VideoskidComponent,
    EmailVerificacionComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    YoutubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

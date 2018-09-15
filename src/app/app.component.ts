import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './_services/user.service';


import { ProfileService } from './_services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  logged = false;
  admin = false;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
  ) {}


  ngOnInit() {
    if ((JSON.parse(sessionStorage.getItem("currentUser")))) {
      let data = this.decodeToken(JSON.parse(sessionStorage.getItem("currentUser")));
      this.logged = true;
      if (data["data"].type == "admin") {
        this.admin = true;
      }
    }
  }


  decodeToken(token) {
    var base64Url = token.access_token.split('.')[1];
    var data = atob(base64Url);
    return data = JSON.parse(data);
  }

  logout(): void {

    let data = this.decodeToken(JSON.parse(sessionStorage.getItem("currentUser")));

    if (data["data"].type == "admin") {

      this.userService.getUser().subscribe(data => {

        this.userService.logout(data).subscribe(res => {
          console.log(res);
          this.router.navigate(["/login"]);
        }, (err) => { console.log(err) });

      }, (err) => { console.log(err) });

      sessionStorage.removeItem("currentUser");
    }
    else if (data["data"].type == "guest") {

      this.profileService.getProfile().subscribe(data => {

        this.profileService.logout(data).subscribe(res => {
          console.log(res);
          this.router.navigate(["/login"]);
        }, (err) => { console.log(err) });

        sessionStorage.removeItem("currentUser");
      }, (err) => { console.log(err) });
    }


  }



}
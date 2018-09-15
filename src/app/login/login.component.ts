import { Component, OnInit } from '@angular/core';
import { User } from '../_lib/user';
import { UserService } from '../_services/user.service';

import { FormBuilder, FormGroup, Validators, AbstractControl, NgForm, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;


  logFormAdmin: FormGroup;
  logFormKid: FormGroup;

  msg: string;


  selectedwalled ="admin";

  constructor(
    private userService: UserService,

    private formBuilder: FormBuilder,
    private router: Router) { }

  createForms() {
    this.logFormAdmin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.logFormKid = this.formBuilder.group({
      username: ['', [Validators.required]],
      pin: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.createForms();
  }

  //LOGIN AS Admin
  logAdmin(): void {
    let pass = this.logFormAdmin.get("password").value;
    let email = this.logFormAdmin.get("email").value;

    this.userService.login(email, pass)
      .subscribe(
        token => {
          console.log(token);

          var base64Url = token.access_token.split('.')[1];
          var data = atob(base64Url);
          data = JSON.parse(data);
          console.log

          if (data["data"].state) {
            this.router.navigate(["/videos"]);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(token));

          } else {
            this.msg = "Your account must be activated";
          }

        }, (err) => {
          console.log(err);
          this.msg = "EMAIL OR PASS INVALID";
          this.router.navigate(["/login"]);
        });
  }

  //LOGIN AS Kid


}

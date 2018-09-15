import { Component, OnInit } from '@angular/core';
import { User } from '../_lib/user';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  //userForm: FormGroup;
  msg = "";

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthday: new FormControl('', [Validators.required, this.ValidateAge,
    Validators.pattern("(?:19|20)[0-9]{2}/(?:(?:0[1-9]|1[0-2])/(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])/(?:30))|(?:(?:0[13578]|1[02])/31))"
    )]),
    country: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passConfirm: new FormControl('', [Validators.required, this.checkPasswords]),
  }, { validators: this.checkPasswords });


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }


  private checkPasswords(formGroup: AbstractControl): { [key: string]: boolean } {
    const pass = formGroup.get('password');
    const confirm = formGroup.get('passConfirm');
    if (!pass || !confirm) {
      return null;
    }

    if (pass.value !== confirm.value) {
      return {
        confirm: true
      };
    }
  }

  ValidateAge(control: AbstractControl) {
    let birthday = control.value;
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    // console.log(age);
    if (age < 18) {
      return { validAge: true };
    }
    return null;
  }

  ngOnInit() {

  }

  registerUser(form: NgForm): void {
    let emailRes;
    this.userService.emailActive(form.controls['email'].value)
      .subscribe(res => {
        this.userService.postUser(form.value)
          .subscribe(res => {
            let id = res['_id'];
            console.log(id);
            this.userForm.reset();
            this.router.navigate(["/login"]);

          }, (err) => {
            this.msg = ("Something went wrong, try again");
            this.userForm.reset();
          });
          
      }, (err) => {
        this.msg = ("Something went wrong, try again");

      });

  }



}

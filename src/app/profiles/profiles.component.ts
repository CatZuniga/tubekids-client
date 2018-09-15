import { Component, OnInit } from '@angular/core';
import { Profile } from '../_lib/profile';
import { ProfileService } from '../_services/profile.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../_lib/user';
import { UserService } from '../_services/user.service';



@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})

export class ProfilesComponent implements OnInit {


  user: User;
  profiles: Profile[];
  profileForm: FormGroup;
  editprofForm: FormGroup;
  editProfile: Profile;

  createForm() {
    this.profileForm = this.formBuilder.group({
      _id: [''],
      user: [''],
      name: ['', Validators.required],
      username: ['', Validators.required],
      pin: ['', [Validators.required, Validators.minLength(6)]],
      years: ['', [Validators.required, Validators.max(17), Validators.pattern('[0-9]*')]],

    });
    this.editprofForm = this.formBuilder.group({
      _id: [''],
      user: [''],
      type:[''],
      name: ['', Validators.required],
      username: ['', Validators.required],
      pin: ['', [Validators.required, Validators.minLength(6)]],
      years: ['', [Validators.required, Validators.max(17), Validators.pattern('[0-9]*')]],

    });
  }

  constructor(
    private profileService: ProfileService, 
    private userService: UserService,
    private formBuilder: FormBuilder, 
    private router: Router) {
    this.createForm();
  }

  ngOnInit() {
   this.getUser();
  
  }
  getUser(): void {
    this.userService.getUser().subscribe(data => {
      this.user = data;
      this.getProfiles();
    }, (err) => { console.log(err) });
  }

  getProfiles(): void {
    this.profileService.getProfiles(this.user._id)
      .subscribe(profileResponse => this.profiles = profileResponse);
  }


  postProfile(form: NgForm) {
   
    this.profileService.postProfiles(form.value,this.user._id)
      .subscribe(res => {
        let id = res['_id'];
        console.log(id);
        this.profileForm.reset();
        this.getProfiles();

      }, (err) => {
        console.log(err);
      });

  }
 
  cargar(profile: Profile): void {

    this.editProfile = {
      _id: profile._id,
      name: profile.name,
      user: profile.user,
      username: profile.username,
      pin: profile.pin,
      years: profile.years,
      type: profile.type
    };

    this.editprofForm.setValue(this.editProfile);
  }

  updateProfile(): void {
    this.profileService.updateProfile(this.editprofForm.value)
      .subscribe(data => {
        this.getProfiles();
      });
  }




  deleteProfile(profile: Profile): void {
    this.profileService.deleteProfile(profile)
      .subscribe(res => {
        this.getProfiles();
      }, (err) => {
        console.log(err);
      }
      );
  }


}

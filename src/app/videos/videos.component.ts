import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

import { User } from '../_lib/user';
import { UserService } from '../_services/user.service';

import { Video } from '../_lib/video';
import { VideoService } from '../_services/video.service';

import { Profile } from '../_lib/profile';
import { ProfileService } from '../_services/profile.service';

import { Prof_video } from '../_lib/prof_video';
import { ProfilevideoService } from '../_services/profilevideo.service';



@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']


})
export class VideosComponent implements OnInit {


  videos: Video[];
  profiles: Profile[];
  videoForm: FormGroup;
  editVideo: Video;

  selectedValues: string[];
  user: User;
  prof_video: Prof_video;


  videoProfiles: Profile[];

  //myOptions: Array<NgSelectModule> = this.profiles;


  constructor(
    private videoService: VideoService,
    private userService: UserService,
    private profileService: ProfileService,
    private prof_videoService: ProfilevideoService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.videoForm = this.formBuilder.group({
      _id: [''],
      user: [''],
      name: ['', Validators.required],
      url: ['', [Validators.required,
        Validators.pattern("^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+"
        )]],
      category: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.getUserVideos();

  }
  getUserVideos(): void {
    this.userService.getUser().subscribe(data => {
      this.user = data;
      this.getVideos();
      this.getProfiles();
    }, (err) => { console.log(err) });
  }

  getVideos(): void {
    this.videoService.getVideos(this.user._id)
      .subscribe(videoResponse => this.videos = videoResponse);

  }

  getProfiles(): void {
    this.profileService.getProfiles(this.user._id).
      subscribe(profileResponse => {
        this.profiles = profileResponse;
      }
      );

  }

  postVideo(form: NgForm) {
    this.videoService.postVideo(form.value, this.user._id)
      .subscribe(res => {
        let id = res['_id']
        console.log(id);

        for (let selected of this.selectedValues) {
          this.prof_video = { _id: null, video: id, client: selected, };
          this.prof_videoService.post(this.prof_video).subscribe(res => {
            let id = res['_id']
            console.log(id);
          });
        }

        this.videoForm.reset();
        this.getVideos();

      }, (err) => {
        alert("Oops, try later")
        console.log(err);
      });

  }

  cargar(video: Video): void {

    console.log(video);

    this.prof_videoService.getClients(video._id).subscribe(res => {

      this.videoProfiles = res;
      console.log(res);
      this.videoForm.patchValue({
        _id: video._id,
        user: video.user,
        name: video.name,
        url: video.url,
        category: [this.videoProfiles.values]
      });

    }, (err) => {
      console.log(err);
    }
    );

  }

  updateVideo(): void {
    let id_video = this.videoForm.controls._id.value;
    console.log(id_video);

    this.prof_videoService.delete(id_video).subscribe(res => {
      console.log("----------------",res);
    }, (err) => {
      console.log(err);
    }
    );

   this.videoService.updateVideo(this.videoForm.value)
      .subscribe(data => {
console.log(data);
        for (let selected of this.selectedValues) {
          this.prof_video = { _id: null, video: id_video, client: selected, };
          this.prof_videoService.post(this.prof_video).subscribe(res => {
            let id = res['_id']
            console.log(id);
          });
        }

        this.videoForm.reset();
        this.getVideos();
      }, (err) => {
        console.log(err);
      });

  }


  deleteVideo(video: Video): void {

    this.prof_videoService.delete(video._id).subscribe(res => {
      console.log(res);

      this.videoService.deleteVideo(video)
      .subscribe(res => {
        this.getVideos();
      }, (err) => {
        console.log(err);
      }
      );
      
    }, (err) => {
      console.log(err);
    }
    );

  }
}

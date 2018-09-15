import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Profile } from '../_lib/profile';
import { ProfileService } from '../_services/profile.service';

import { Prof_video } from '../_lib/prof_video';
import { ProfilevideoService } from '../_services/profilevideo.service';

import { Video } from '../_lib/video';
import { VideoService } from '../_services/video.service';

@Component({
  selector: 'app-videoskid',
  templateUrl: './videoskid.component.html',
  styleUrls: ['./videoskid.component.css'],
})
export class VideoskidComponent implements OnInit {


  profile: Profile;
  videos: Prof_video[];
  idPlayVideo;
  ids: string[] = [];
  busqueda: Prof_video[];


  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private prof_videoService: ProfilevideoService,
    private profileService: ProfileService,
    private videoService: VideoService,
  ) {}

  ngOnInit() {
     this.getKidVideos();
   
  }

  getKidVideos(): void {
    this.profileService.getProfile().subscribe(data => {
      this.profile = data;
      setTimeout(() => {
        console.log(data);
        this.getVideos();
      }, 4000);
     
    }, (err) => { console.log(err) });
  }

  getVideos(): void {
    this.prof_videoService.getVideos(this.profile._id)
      .subscribe(videoResponse => this.videos = videoResponse
      );
  }

  playVideo(video: Video): void {

    console.log(video.url);
    console.log(video.url.split("=")[1]);
    this.ids = [];
    this.ids.push(video.url.split("=")[1]);

    this.idPlayVideo = (video.url.split("=")[1])

  }

  search(): void {
  }

}

import { Injectable } from '@angular/core';
import { Video } from '../_lib/video';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class VideoService {

  private videoUrl = 'http://localhost:3000/videos/';  // URL to web api


  token = (JSON.parse(sessionStorage.getItem("currentUser")).access_token);

  private httpOptions = {
    headers: new HttpHeaders({ 'Authorization': "Bearer " + this.token })
  };

  constructor(private http: HttpClient) {
    
  }

  private handleError(error: HttpErrorResponse) {
   
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } 
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };



  getVideos(user_id:string): Observable<Video[]> {
    return this.http.get<Video[]>(this.videoUrl+"user/"+user_id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  postVideo(video: Video, user_id:string): Observable<any> {
    video.user = user_id;
    console.log(video);
    return this.http.post(this.videoUrl, video, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  deleteVideo(video: Video): Observable<{}> {
    return this.http.delete(this.videoUrl  + video._id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateVideo(video: Video): Observable<any> {
    return this.http.patch(this.videoUrl  + video._id, video, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
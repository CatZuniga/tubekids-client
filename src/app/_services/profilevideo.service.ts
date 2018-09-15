import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

import { Prof_video } from '../_lib/prof_video';



@Injectable({
  providedIn: 'root'
})
export class ProfilevideoService {


  private profvideoUrl = 'http://localhost:3000/client_video/';  // URL to web api


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

  getClients(video_id:string):Observable<any>{
    return this.http.get(this.profvideoUrl+"client/"+video_id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  getVideos(client_id:string): Observable<Prof_video[]> {
    return this.http.get<Prof_video[]>(this.profvideoUrl+"video/"+client_id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  post(pv: Prof_video): Observable<any> {
    return this.http.post(this.profvideoUrl, pv, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete (video_id :string): Observable<{}> {
     return this.http.delete(this.profvideoUrl+video_id , this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}


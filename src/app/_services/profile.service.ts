import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Profile } from '../_lib/profile';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileUrl = 'http://localhost:3000/client/';  // URL to web api



  private httpOptions ;

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  constructor(private http: HttpClient) {

    if ((JSON.parse(sessionStorage.getItem("currentUser")))) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': "Bearer "
            + JSON.parse(sessionStorage.getItem("currentUser")).access_token
        })
      };


    }

  }


  login(username: string, pin: string): Observable<any> {
    return this.http.get(this.profileUrl  + username + "/" + pin)
      .pipe(
        map(token => {
          // login successful if there's a jwt token in the response
          if (token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(token));
          }
          return token;
        }),
        catchError(this.handleError)

      );
  }

  getProfile(): Observable<any> {
    return this.http.get(this.profileUrl + "token", this.httpOptions)
      .pipe(
        map(user => user),
        catchError(this.handleError)
      );
  }

 
  getProfiles(user_id:string): Observable<Profile[]> {
   let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer "
          + JSON.parse(sessionStorage.getItem("currentUser")).access_token
      })}

   
    return this.http.get<Profile[]>(this.profileUrl+user_id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  postProfiles(profile: Profile, user_id:string ): Observable<any> {
    profile.user = user_id;

    return this.http.post(this.profileUrl, profile, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProfile(profile: Profile): Observable<{}> {
    return this.http.delete(this.profileUrl  + profile._id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProfile(profile: Profile): Observable<any> {
    return this.http.patch(this.profileUrl  + profile._id, profile, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(profile: Profile): Observable<{}> {
    return this.http.delete(this.profileUrl+"logout/" + profile._id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }
}

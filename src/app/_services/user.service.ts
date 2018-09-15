import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { User } from '../_lib/user';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  private httpOptions;

  // URL to web api
  private userUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {

    //get access token from session storage and set on HTTP requests
    if ((JSON.parse(sessionStorage.getItem("currentUser")))) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': "Bearer "
            + JSON.parse(sessionStorage.getItem("currentUser")).access_token
        })
      };
    }
  }

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

  // get information from current user login
  getUser(): Observable<any> {
    return this.http.get(this.userUrl + "/token", this.httpOptions)
      .pipe(
        map(user => user),
        catchError(this.handleError)
      );
  }

  // Authenticate user with email and password
  login(email: string, password: string): Observable<any> {
    return this.http.get(this.userUrl + "/" + email + "/" + password)
      .pipe(
        map(token => {
          // login successful if there's a jwt token in the response
          return token;
        }),
        catchError(this.handleError)

      );
  }

  // register new user 
  postUser(user: User): Observable<any> {
    return this.http.post(this.userUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  //activate the acc with url code / update the db
  verificateUser(code): Observable<any> {
    let data = { code: code };
    return this.http.patch('http://localhost:3000/email/verificar/', data)
      .pipe(
      );
  }

  // send to user the email acc activatation 
  emailActive(email: string): Observable<any> {
    return this.http.get('http://localhost:3000/email/send/' + email).pipe(
      map(user => user),
      catchError(this.handleError)

    );
  }


  // delete current session on db
  logout(user: User): Observable<{}> {
    return this.http.delete(this.userUrl + "/" + user._id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


}
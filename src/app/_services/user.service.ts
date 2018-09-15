import { Injectable } from '@angular/core';

import { User } from '../_lib/user';
//import { url } from 'inspector';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})


export class UserService {

  private httpOptions;
  private userUrl = 'http://localhost:3000/user';  // URL to web api

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

  getUser(): Observable<any> {
    return this.http.get(this.userUrl + "/token", this.httpOptions)
      .pipe(
        map(user => user),
        catchError(this.handleError)

      );

  }

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
  emailActive(email: string): Observable<any> {
    return this.http.get('http://localhost:3000/email/send/' + email).pipe(
      map(user => user),
      catchError(this.handleError)

    );
  }
  //register
  postUser(user: User): Observable<any> {
    return this.http.post(this.userUrl, user)
      .pipe(
        catchError(this.handleError)
      );

  }

  logout(user: User): Observable<{}> {
    return this.http.delete(this.userUrl + "/" + user._id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  //router.patch('/email/verificar/:code',Email.verificar);
  verificateUser(code): Observable<any> {
    let data = { code: code };
    return this.http.patch('http://localhost:3000/email/verificar/', data)
      .pipe(
      );
  }

}
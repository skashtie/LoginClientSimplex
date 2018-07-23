import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
    // console.log(' login aut client abc ');
    // console.log(' login aut client abc environment.apiUrl = ' + environment.apiUrl);
   }
    testFunc() {

      // console.log(' testFunc() https://localhost:4007 ');
      return this.http.get<any>(`https://localhost:4007`)
      .pipe(map(res => {
          // login successful if there's a jwt token in the response
          // console.log('test aut succ');
          // console.log('test aut res = ' + res);
          return 'aaa';
      }));
    }

    login(username: string, password: string) {
      // console.log('login aut start');

        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user.token;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const AUTH = 'auth/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject(false);
  isLoggedIn = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient) {
    if (localStorage.getItem('jwt_token') != null) {
      this._isLoggedIn.next(true);
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(environment.API + AUTH + '/login', {
        username,
        password,
      })
      .pipe(
        // Grab the JWT token to save to localStorage.
        tap((res: any) => {
          localStorage.setItem('jwt_token', res.token);
          this._isLoggedIn.next(true);
        })
      );
  }

  register(
    username: string,
    password: string,
    email?: string
  ): Observable<any> {
    return this.http.post(environment.API + AUTH + '/register', {
      username,
      password,
      email,
    });
  }

  logout(): Observable<any> {
    this._isLoggedIn.next(false);
    return this.http.post(environment.API + AUTH + '/logout', {});
  }

  get token() {
    return localStorage.getItem('jwt_token');
  }
}

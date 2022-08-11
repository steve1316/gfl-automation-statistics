import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const AUTH = 'auth/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(environment.API + AUTH + '/login', {
      username,
      password,
    });
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
    return this.http.post(environment.API + AUTH + '/logout', {});
  }
}

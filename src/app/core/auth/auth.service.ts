import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

interface ResponseData {
  email: string,
  idToken: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'auth_token';
  private readonly EXPIRATION_KEY = 'auth_token_expiration'

  constructor(private http: HttpClient) {
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRATION_KEY);
  }

  signUp(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<ResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzmAxjsBMfNVGQWnJmucuqeE0ontM5i20',
        {
          email: credentials.email,
          password: credentials.password,
          returnSecureToken: true
        }).pipe(
        tap(res => this.setSession(res)));
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<ResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzmAxjsBMfNVGQWnJmucuqeE0ontM5i20',
        {
          email: credentials.email,
          password: credentials.password,
          returnSecureToken: true
        }).pipe(
        tap(res => this.setSession(res)));
  }

  isLoggedIn(): boolean {
    const expirationDate = JSON.parse(localStorage.getItem(this.EXPIRATION_KEY) as string);
    console.log(expirationDate)
    return expirationDate && new Date().getTime() < expirationDate;
  }

  private setSession(authResp: any): void {
    const expiresIn = authResp.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem(this.TOKEN_KEY, authResp.token);
    localStorage.setItem(this.EXPIRATION_KEY, JSON.stringify(expirationDate));
  }

}

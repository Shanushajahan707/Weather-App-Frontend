import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl=environment.apiUrl
  
  private loggedIn = new BehaviorSubject<boolean>(false);
  private headerTitle = new BehaviorSubject<string>('Login');
  
  // Expose the observables
  isLoggedIn$ = this.loggedIn.asObservable();
  headerTitle$ = this.headerTitle.asObservable();
  
  constructor(private _http: HttpClient) {}

  
  setLoggedIn(isLoggedIn: boolean): void {
    this.loggedIn.next(isLoggedIn);
  }

  setHeaderTitle(title: string): void {
    this.headerTitle.next(title);
  }

  login(email: string, password: string): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}login`, { email, password });
  }
  register(email: string, password: string): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}register`, { email, password });
  }
}

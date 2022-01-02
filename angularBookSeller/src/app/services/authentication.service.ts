import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  //api
  BASE_URL = 'http://localhost:8080/api/authentication/';

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  constructor(private http: HttpClient) {
    //localStorage
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }
    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  //login
  login(user: User): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'sign-in', user).pipe(
      map((response) => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  //register
  register(user: User): Observable<any> {
    return this.http.post(this.BASE_URL + 'sign-up', user);
  }

  //logout
  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User());
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';

@Injectable({
  providedIn: 'root',
})
export class BookService extends RequestBaseService {
  //api
  apiUrl = 'http://localhost:8080/api/book';
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  //post
  saveBook(book: Book): Observable<any> {
    return this.http.post(this.apiUrl, book, { headers: this.getHeaders });
  }

  //delete
  deleteBook(book: Book): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + book.id, { headers: this.getHeaders });
  }

  //get
  getAllBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

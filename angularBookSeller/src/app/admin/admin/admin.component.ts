import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  bookList:Book[] = [];
  selectedBook: Book = new Book();
  errorMessage: string = '';
  @ViewChild(BookComponent) child: BookComponent;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      this.bookList = data;
    });
  }

  saveBookWatcher(book: Book) {
    let itemIndex = this.bookList.findIndex(item => item.id === book.id);
    if (itemIndex !== -1) {
      this.bookList[itemIndex] = book;
    } else {
      this.bookList.push(book);
    }
  }

  createBookRequest() {
    this.child?.showBookModal();
  }
}

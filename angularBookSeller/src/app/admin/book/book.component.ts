import { BookService } from './../../services/book.service';
import { Book } from 'src/app/models/book.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//jguery
declare var $: any;
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  book: Book = new Book();
  errMessage: string;

  //@Input() book: Book = new Book();
  @Output() save = new EventEmitter<any>();
  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  saveBook() {
    this.bookService.saveBook(this.book).subscribe(
      (data) => {
        this.save.emit(data);
        $('#bookModal').modal('hide'); //Kayıt gerçekleşince form model kapatılacak.
      },
      (error) => {
        this.errMessage = 'Beklenmedik bir hata oluştu.';
        console.log(error);
      }
    );
  }

  //jguery Modeli gösterme kısmı
  showBookModal() {
    $('#bookModal').modal('show');
  }
}

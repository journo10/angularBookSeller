export class Purchase {
  id: number;
  userId: number;
  bookId: number;
  price: number;
  purchaseTime: Date = new Date();

  constructor(userId: number, bookId: number, price: number) {
    this.userId = userId;
    this.bookId = bookId;
    this.price = price;
  }
}

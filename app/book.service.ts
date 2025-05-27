import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { books } from './books';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  checkIfBookExists(data: string) {
    return this.httpClient.get(`${this.baseURL}/library/books/checkIfExists/${data}`);
  }
  getBookAddedByDays(arg0: number) {
    return this.httpClient.get(`${this.baseURL}/library/books/searchAddedBefor/${arg0}`);
  }
  filterBook(searchArray: string[]) {
    return this.httpClient.get(`${this.baseURL}/library/books/filter/${searchArray}`);
  }
  addImeage(bookId: any, formData: FormData) {
    return this.httpClient.put(`${this.baseURL}/library/book/${bookId}`,formData)
  }
  addBook(book: books) {
    return this.httpClient.post(`${this.baseURL}/library/books`,book);
  }
  deleteBook(arg0: any) {
    return this.httpClient.delete(`${this.baseURL}/library/books/${arg0}`)
  }
  
  getBookByText(vale: any) {
    return this.httpClient.get(`${this.baseURL}/library/books/search/${vale}`)
  }
  getBookById(id:any) {
    return this.httpClient.get(`${this.baseURL}/library/books/${id}`)
  }

  getAllBooks() {
   return this.httpClient.get(`${this.baseURL}/library/books`);
  }

  private baseURL = "http://localhost:8080";
  
  constructor(private httpClient : HttpClient) { }
}

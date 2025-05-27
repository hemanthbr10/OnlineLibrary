import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServixceService {
  private searchDataSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Hello');
  searchData$: Observable<string> = this.searchDataSubject.asObservable();

  constructor() { }

  updateSearchData(data: string) {
    this.searchDataSubject.next(data);
  }
}

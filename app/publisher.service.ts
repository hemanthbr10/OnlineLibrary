import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { publisher } from './publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  deletePublisher(publisherId: any) {
    return this.httpClient.delete(`${this.baseURL}/library/publisher/${publisherId}`);
  }
  addPublisher(publisher: publisher) {
    return this.httpClient.post(`${this.baseURL}/library/publisher`,publisher);
  }
  getPublisherById(arg0: number) {
    return this.httpClient.get(`${this.baseURL}/library/publisher/${arg0}`);
  }
  searchPublisher(text:any) {
    return this.httpClient.get(`${this.baseURL}/library/publisher/search/${text}`)
  }
  getAllPublishers() {
    return this.httpClient.get(`${this.baseURL}/library/publisher`);
  }
  private baseURL = "http://localhost:8080";
  constructor(private httpClient : HttpClient){ }
}

import { Injectable } from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal/observable/dom/WebSocketSubject';
import {HttpClient} from '@angular/common/http';
import {webSocket} from 'rxjs/webSocket';
import {MessageDefinition} from '../type/types';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = "http://127.0.0.1:5000";

  private webSocket$: WebSocketSubject<any>;

  constructor(
    private httpClient: HttpClient
  ) {
    this.webSocket$ = webSocket(this.BASE_URL + "/ws");
  }

  sendMessage(message: MessageDefinition): Observable<any> {
    console.log("test")
    return this.httpClient.put<any>(this.BASE_URL + '/send', message);
  }

  changeTopic(topic: string) {
    this.httpClient.put<any>(this.BASE_URL + '/change_topic', topic);
  }

  getNewMessage(): Observable<any> {
    return this.webSocket$.asObservable();
  }

  closeConnection() {
    this.webSocket$.complete();
  }

}

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

  constructor(
    private httpClient: HttpClient
  ) {}

  sendMessage(message: MessageDefinition): Observable<any> {
    return this.httpClient.put<any>(this.BASE_URL + '/send', message);
  }

  changeTopic(topic: any): Observable<any> {
    return this.httpClient.put<any>(this.BASE_URL + '/change_topic', topic);
  }

  getNewMessage(): Observable<MessageDefinition[]> {
    return this.httpClient.get<MessageDefinition[]>(this.BASE_URL + '/get')
  }

}

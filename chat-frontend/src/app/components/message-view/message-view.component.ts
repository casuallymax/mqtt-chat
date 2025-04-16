import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {ApiService} from '../../service/api.service';
import {MessageDefinition} from '../../type/types';
import {Subscription} from 'rxjs';
import {Parser} from '../../util/parser';

@Component({
  selector: 'app-message-view',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent
  ],
  standalone: true,
  templateUrl: './message-view.component.html',
  styleUrl: './message-view.component.scss'
})
export class MessageViewComponent implements OnInit, OnDestroy {

  protected storedMessages: MessageDefinition[] = [];

  private subs: Subscription[] = []

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.connectWebSocket();
  }

  ngOnDestroy(): void {
    this.apiService.closeConnection();
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  connectWebSocket() {
    this.subs.push(this.apiService.getNewMessage().subscribe((messages) => {
      this.storedMessages = messages;
    }));
  }

}

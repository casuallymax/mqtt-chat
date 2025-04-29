import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {ApiService} from '../../service/api.service';
import {MessageDefinition} from '../../type/types';
import {catchError, Observable, of, Subject, Subscription, switchMap, takeUntil, timer} from 'rxjs';

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

  private subs: Subscription[] = [];

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.subs.push(timer(0,2500).pipe(
      switchMap(() => this.apiService.getNewMessage())
    ).subscribe((messages) => {
      this.storedMessages = messages;
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }



}

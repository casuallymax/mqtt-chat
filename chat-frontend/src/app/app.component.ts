import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MessageSendComponent} from './components/message-send/message-send.component';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MessageViewComponent} from './components/message-view/message-view.component';
import {ChangeTopicComponent} from './components/change-topic/change-topic.component';

@Component({
  selector: 'app-root',
  imports: [MessageSendComponent, MatCard, MatCardContent, MessageViewComponent, ChangeTopicComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chat-frontend';
}

import {Component, OnDestroy} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatFabButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MessageDefinition} from '../../type/types';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Parser} from '../../util/parser';

@Component({
  selector: 'app-message-send',
  imports: [
    MatFormField,
    MatInput,
    MatFabButton,
    MatIconModule,
    MatLabel,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './message-send.component.html',
  styleUrl: './message-send.component.scss'
})
export class MessageSendComponent implements OnDestroy {

  messageForm = new FormGroup({
    topic: new FormControl('default', {nonNullable: true}),
    sender: new FormControl('', {nonNullable: true}),
    text: new FormControl('', {nonNullable: true})
  });

  private sub!: Subscription;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  submitMessage() {
    const message: MessageDefinition = Parser.parse(this.messageForm.getRawValue())
    this.sub = this.apiService.sendMessage(message).subscribe((response) => {
      this.toastr.success(response.message, 'Send Message to ' + message.topic);
    }, (error) => {
      this.toastr.error(error.error.message, 'Error sending message!');
    });
  }


}

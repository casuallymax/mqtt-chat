import {Injectable} from '@angular/core';
import {MessageDefinition} from '../type/types';

@Injectable({
  providedIn: 'root'
})
export class Parser {

  static parse(messageData: any): MessageDefinition {
    const topic = messageData.topic;
    const sender = messageData.sender;
    const clientId = messageData.clientId;
    const text = messageData.text;

    return {
      topic,
      sender,
      clientId,
      text
    }

  }

}

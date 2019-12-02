import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  subject = new Subject();
  constructor() { }

  /* Set the message in subject variable */
  sendMessage(message: any) {
    this.subject.next(message);
  }

  /* Clear the message from subject*/
  clearMessages() {
    this.subject.next();
  }

  /* Get the message from subject*/
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}

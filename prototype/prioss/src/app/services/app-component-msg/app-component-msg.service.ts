import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AppComponentMsg } from 'src/app/enum/app-component-msg.enum';

@Injectable({
  providedIn: 'root'
})
export class AppComponentMsgService {
  private appMsgSubject = new BehaviorSubject<AppComponentMsg>(AppComponentMsg.none);
  public appMsg$ = this.appMsgSubject.asObservable();

 /**
  * Messages the app component. The component will respond to specific messages in different ways.
  *
  * @param msg - a string containing the message that should be passed to the app component
  * @author: Simon (scg@mail.upb.de)
  *
  */
  public msgAppComponent(msg: AppComponentMsg) 
  {
    this.appMsgSubject.next(msg);
  }
}

import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { IHash } from '../types/i-hash';

@Injectable()
export class NgxPubSubService implements OnDestroy {
  private eventObservableMapping: IHash;

  constructor() {
    this.eventObservableMapping = {};
  }

  getEventObservable(key: string): Observable<any> {
    this.createIfNotExists(key);
    return this.eventObservableMapping[key].asObservable();
  }

  publishEvent(eventName: string, data: any) {
    this.createIfNotExists(eventName);
    this.eventObservableMapping[eventName].next(data);
  }

  completeEvent(eventName: string) {
    if (!this.eventObservableMapping[eventName]) {
      throw Error('Event not created yet');
    }
    this.completeObservableAndDestroyMapping(eventName);
  }

  ngOnDestroy() {
    for (const key in this.eventObservableMapping) {
      if (this.eventObservableMapping.hasOwnProperty(key)) {
        this.completeObservableAndDestroyMapping(key);
      }
    }
  }
  
  private createIfNotExists(key: string) {
    if (!this.eventObservableMapping[key]) {
      this.eventObservableMapping[key] = new Subject();
    }
  }

  private completeObservableAndDestroyMapping(key: string) {
    this.eventObservableMapping[key].complete();
    delete this.eventObservableMapping[key];
  }

}

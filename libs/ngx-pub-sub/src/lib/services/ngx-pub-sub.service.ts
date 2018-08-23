import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { SchedulerLike } from 'rxjs/internal/types';

import { IHash } from '../types/i-hash';
import { SubjectType } from '../types/subject-type.enum';

@Injectable()
export class NgxPubSubService implements OnDestroy {

  private eventObservableMapping: IHash;

  constructor() {
    this.eventObservableMapping = {};
  }
  
  publishEvent(eventName: string, data?: any) {
    this.validateEventName(eventName);
    this.createSubjectIfNotExist(eventName);

    this.publishNext(eventName, data);
  }
  
  subscribe(eventName: string, next?: (value: any) => void, error?: (error: any) => any, complete?: () => void): Subscription {
    this.validateEventName(eventName);
    // subject will be created if the provided eventName is not registered
    this.createSubjectIfNotExist(eventName);

    return this.eventObservableMapping[eventName].ref.subscribe(next, error, complete);
  }

  /**
   * @@deprecated this method is deprecated since 2.0.0. Use subscribe instead.
   */
  getEventObservable(eventName: string): Observable<any> {
    this.validateEventName(eventName);
    // type and name check
    this.checkEventType(eventName, SubjectType.Subject);
    
    return this.eventObservableMapping[eventName].ref.asObservable();
  }

  registerEventWithLatestValue(name: string, defaultValue: any) {
    this.validateEventName(name);
    // type and name check
    this.checkEventType(name, SubjectType.BehaviorSubject, true);
    // create one
    this.eventObservableMapping[name] = {
      type: SubjectType.BehaviorSubject,
      ref: new BehaviorSubject(defaultValue)
    };
  }

  registerEventWithHistory(name: string, bufferSize?: number, windowTime?: number, scheduler?: SchedulerLike) {
    this.validateEventName(name);
    // type and name check
    this.checkEventType(name, SubjectType.ReplaySubject, true);
    // create one
    this.eventObservableMapping[name] = {
      type: SubjectType.ReplaySubject,
      ref: new ReplaySubject(bufferSize, windowTime, scheduler)
    };
  }

  publishWithLast(eventName: string, data?: any) {
    this.validateEventName(eventName);
    this.publishNext(eventName, SubjectType.BehaviorSubject, data);
  }

  publishWithHistory(eventName: string, data: any) {
    this.validateEventName(eventName);
    this.publishNext(eventName, SubjectType.ReplaySubject, data);
  }
  
  completeEvent(eventName: string) {
    this.validateEventName(eventName);
    if (!this.eventObservableMapping[eventName]) {
      throw Error('Event not created yet');
    }
    this.completeObservableAndDestroyMapping(eventName);
  }

  ngOnDestroy() {
    for (const eventName in this.eventObservableMapping) {
      if (this.eventObservableMapping.hasOwnProperty(eventName)) {
        this.completeObservableAndDestroyMapping(eventName);
      }
    }
  }
  
  private publishNext(eventName: string, type: SubjectType = SubjectType.Subject, data?: any) {
    this.checkEventType(eventName, type);
    this.eventObservableMapping[eventName].ref.next(data);
  }

  private checkEventType(eventName: string, type: SubjectType = SubjectType.Subject, shouldNotExist = false) {
    const object = this.eventObservableMapping[eventName];
    let errorMessage;
    if(!object && shouldNotExist) { return; }
    if(!object) {
      errorMessage = `Event doesn't exist of type: ${type.toString()} or it has been completed`;
    } else if(object.type !== type) {
      errorMessage = `Event exists with other type: ${object.type}. Expected type: ${type.toString()}`;
    }
    if(shouldNotExist && object.type === type) {
      errorMessage = `Event already registerd with the same type. Don't register a second time`;
    }
    if(errorMessage) {
      throw Error(`Error (${eventName}): ${errorMessage}`);
    }
  }

  private createSubjectIfNotExist(eventName: string) {
    const object = this.eventObservableMapping[eventName];
    if(object) { return; }
  
    this.eventObservableMapping[eventName] = {
      type: SubjectType.Subject,
      ref: new Subject()
    };
  }

  private validateEventName(eventName: string) {
    if(!eventName) {
      throw Error('Event name not provided');
    }
  }

  private completeObservableAndDestroyMapping(eventName: string) {
    this.eventObservableMapping[eventName].ref.complete();
    delete this.eventObservableMapping[eventName];
  }

}

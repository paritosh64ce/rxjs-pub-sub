import { TestBed, inject } from '@angular/core/testing';

import { NgxPubSubService } from './ngx-pub-sub.service';

describe('NgxPubSubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxPubSubService]
    });
  });

  it('should be created', inject(
    [NgxPubSubService],
    (service: NgxPubSubService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should throw error if name is not provided', (
    inject([NgxPubSubService], (service: NgxPubSubService) => {
      expect(() => service.getEventObservable('')).toThrowError();
      let eventName = '';
      expect(() => service.getEventObservable(eventName)).toThrowError();
      eventName = '';
      expect(() => service.getEventObservable(eventName)).toThrowError();
      
      expect(() => service.registerEventWithHistory(eventName)).toThrowError();
      expect(() => service.registerEventWithLastValue(eventName, 'someValue')).toThrowError();

      expect(() => service.publishEvent(eventName)).toThrowError();
      expect(() => service.subscribe(eventName)).toThrowError();
      expect(() => service.publishWithHistory(eventName)).toThrowError();
      expect(() => service.publishWithLast(eventName)).toThrowError();
    })));

  it('should throw error if same name is registered with other event type', (
    inject([NgxPubSubService], (service: NgxPubSubService) => {
      
      service.registerEventWithHistory('history');
      expect(() => service.registerEventWithLastValue('history', 'someValue')).toThrowError();
      
      service.registerEventWithLastValue('last', 'someValue');
      expect(() => service.registerEventWithHistory('history')).toThrowError();
      
      service.getEventObservable('normalEvent');
      expect(() => service.registerEventWithLastValue('normalEvent', 'someValue')).toThrowError();
      expect(() => service.registerEventWithHistory('normalEvent')).toThrowError();
    })));

  //#region older-depricated tests
  it('should create/return Obervable when event name is provided', inject(
    [NgxPubSubService],
    (service: NgxPubSubService) => {
      const myObservable = service.getEventObservable('newEvent');

      expect(myObservable).not.toBeUndefined();
      expect(myObservable).not.toBeNull();
      expect(typeof(myObservable.subscribe)).toBe('function');
    }
  ));
  
  it('should publish the event', inject(
    [NgxPubSubService],
    (service: NgxPubSubService) => {
      const myObservable = service.getEventObservable('newEvent');
      const complexObject = { key: 5 };

      myObservable.subscribe(data => {
        expect(data).toBe(complexObject);
      });
      service.publishEvent('newEvent', complexObject);
    }
  ));
  
  it('should publish the event', inject(
    [NgxPubSubService],
    (service: NgxPubSubService) => {
      const myObservable = service.getEventObservable('newEvent');
      const complexObject = { key: 5 };
      myObservable.subscribe(data => {
          expect(data).toBe(complexObject);
        }, 
        error => console.log(error),
        () => console.log('event completed')
      );

      service.publishEvent('newEvent', complexObject);
    }
  ));
  //#endregion
  
  it('should stop the observable while completing it', inject(
    [NgxPubSubService],
    (service: NgxPubSubService) => {
      const myObservable = service.getEventObservable('newEvent');
      expect((<any>myObservable.source).isStopped).toBe(false);

      service.completeEvent('newEvent');
      expect((<any>myObservable.source).isStopped).toBe(true);
    }
  ));
  
  it('should throw error if event observable is not created before completing it', inject(
    [NgxPubSubService],
    (service: NgxPubSubService) => {
      expect(() => service.completeEvent('newEvent')).toThrowError();
    }
  ));
  
  it('should remove the mapping from memory while getting destroyed', inject(
    [NgxPubSubService],
    (service: NgxPubSubService) => {
      const myObservable = service.getEventObservable('newEvent');
      service.ngOnDestroy();
      // how would you check this? :)
    }
  ));

});

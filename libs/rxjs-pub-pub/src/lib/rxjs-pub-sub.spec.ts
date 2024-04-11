import { rxjsPubSub } from './rxjs-pub-sub';

describe('rxjsPubSub', () => {
  it('should work', () => {
    expect(rxjsPubSub).not.toBeUndefined();
  });

  it('should throw error if name is not provided', () => {
    expect(() => rxjsPubSub.getEventObservable('')).toThrowError();
    let eventName = '';
    expect(() => rxjsPubSub.getEventObservable(eventName)).toThrowError();
    eventName = '';
    expect(() => rxjsPubSub.getEventObservable(eventName)).toThrowError();

    expect(() => rxjsPubSub.registerEventWithHistory(eventName)).toThrowError();
    expect(() => rxjsPubSub.registerEventWithLastValue(eventName, 'someValue')).toThrowError();

    expect(() => rxjsPubSub.publishEvent(eventName)).toThrowError();
    expect(() => rxjsPubSub.subscribe(eventName)).toThrowError();
    expect(() => rxjsPubSub.publishWithHistory(eventName)).toThrowError();
    expect(() => rxjsPubSub.publishWithLast(eventName)).toThrowError();
  });

  it('should throw error if same name is registered with other event type', () => {
    rxjsPubSub.registerEventWithHistory('history');
    expect(() => rxjsPubSub.registerEventWithLastValue('history', 'someValue')).toThrowError();

    rxjsPubSub.registerEventWithLastValue('last', 'someValue');
    expect(() => rxjsPubSub.registerEventWithHistory('history')).toThrowError();

    rxjsPubSub.getEventObservable('normalEvent');
    expect(() => rxjsPubSub.registerEventWithLastValue('normalEvent', 'someValue')).toThrowError();
    expect(() => rxjsPubSub.registerEventWithHistory('normalEvent')).toThrowError();
  });

  it('should publish / subscribe for observables with last value', () => {
    const myDefaultValue = 123;
    const eventName = 'eventForLastValue';
    rxjsPubSub.registerEventWithLastValue(eventName, myDefaultValue);

    const myNewValue = 456;
    rxjsPubSub.publishWithLast(eventName, myNewValue);
    const myLastValueSubscriber = rxjsPubSub.getEventObservable(eventName);

    myLastValueSubscriber.subscribe({
      next: nextValue => {
        expect([myDefaultValue, myNewValue].indexOf(nextValue) > -1).toBeTruthy();
      }
    });
  });

  it('should publish / subscribe for observables with historic value', () => {
    const myValues = [1, 2, 3, 4, 5, 6, 7];
    const eventName = 'eventForHistory';
    rxjsPubSub.registerEventWithHistory(eventName, 3);

    rxjsPubSub.publishWithHistory(eventName, myValues[0]);
    rxjsPubSub.publishWithHistory(eventName, myValues[1]);
    rxjsPubSub.publishWithHistory(eventName, myValues[2]);
    const myLastValueSubscriber = rxjsPubSub.getEventObservable(eventName);

    myLastValueSubscriber.subscribe({
      next: nextValue => {
        expect(myValues.indexOf(nextValue) > -1).toBeTruthy();
      }
    });
  });

  //#region older-depricated tests
  it('should create/return Obervable when event name is provided', () => {
    const myObservable = rxjsPubSub.getEventObservable('newEvent');

    expect(myObservable).not.toBeUndefined();
    expect(myObservable).not.toBeNull();
    expect(typeof (myObservable.subscribe)).toBe('function');
  });

  it('should publish the event', () => {
    const myObservable = rxjsPubSub.getEventObservable('newEvent');
    const complexObject = { key: 5 };

    myObservable.subscribe(data => {
      expect(data).toBe(complexObject);
    });
    rxjsPubSub.publishEvent('newEvent', complexObject);
  });

  it('should publish the event', () => {
    const myObservable = rxjsPubSub.getEventObservable('newEvent');
    const complexObject = { key: 5 };
    myObservable.subscribe(data => {
      expect(data).toBe(complexObject);
    },
      error => console.log(error),
      () => console.log('event completed')
    );

    rxjsPubSub.publishEvent('newEvent', complexObject);
  });
  //#endregion

  it('should stop the observable while completing it', () => {
    const myObservable = rxjsPubSub.getEventObservable('newEvent');
    expect((<any>myObservable.source).isStopped).toBe(false);

    rxjsPubSub.completeEvent('newEvent');
    expect((<any>myObservable.source).isStopped).toBe(true);
  });

  it('should throw error if event observable is not created before completing it', () => {
    expect(() => rxjsPubSub.completeEvent('newEvent')).toThrowError();
  });

  it('should remove the mapping from memory when the event is asked to complete', () => {
    rxjsPubSub.publishEvent('newEvent');
    expect(() => rxjsPubSub.registerEventWithLastValue('newEvent', 0)).toThrowError();
    rxjsPubSub.completeEvent('newEvent');
    expect(() => rxjsPubSub.getEventObservable('newEvent')).not.toThrowError();
    rxjsPubSub.completeEvent('newEvent');
  });

});

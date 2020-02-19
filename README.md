# 🔔 NgxPubSub 🔔

Event publish - subscribe mechanism as Angular service using Observable. You can publish your event along with any data to all the subscribers of your event (event identification is being done using event-name as string). This library also supports historical published values for the new subscribers. 

[![Build Status](https://travis-ci.com/paritosh64ce/ngx-pub-sub.svg?branch=master)](https://travis-ci.com/paritosh64ce/ngx-pub-sub)
[![npm](https://img.shields.io/npm/v/@pscoped/ngx-pub-sub.svg)](https://www.npmjs.com/package/@pscoped/ngx-pub-sub)
[![npm](https://img.shields.io/npm/dt/@pscoped/ngx-pub-sub.svg)](https://www.npmjs.com/package/@pscoped/ngx-pub-sub)
[![npm](https://img.shields.io/github/license/paritosh64ce/ngx-pub-sub.svg)](https://github.com/paritosh64ce/ngx-pub-sub/blob/master/LICENSE)
[![PayPal Donate](https://img.shields.io/badge/donate-PayPal.me-ff69b4.svg)](https://www.paypal.me/paritosh64patel)


[![Dependency Status](https://img.shields.io/david/paritosh64ce/ngx-pub-sub.svg)](https://david-dm.org/paritosh64ce/ngx-pub-sub.svg)
[![devDependency Status](https://img.shields.io/david/dev/paritosh64ce/ngx-pub-sub.svg)](https://david-dm.org/paritosh64ce/ngx-pub-sub.svg#info=devDependencies)
[![codecov](https://codecov.io/gh/paritosh64ce/ngx-pub-sub/branch/master/graph/badge.svg)](https://codecov.io/gh/paritosh64ce/ngx-pub-sub)

## [Live Demo Link](https://pscoped-ngx-pub-sub-demo.stackblitz.io/)

## What makes this package special?

1. Simplicity
    - Publish you data
    ```typescript
    service.publishEvent('eventName', data)
    ```
    - Subscribe to your event
    ```typescript
    service.subscribe('eventName', (data: any) => { /* your callback */ })
    ```

2. Unique feature
    - This service also supports historical values even for new subscribers.
    ```typescript
    service.publishWithHistory('eventName', data)   /* new subscribers can have historical values */
    service.publishWithLast('eventName', data)      /* new subscribers can have last published value */
    ```

## How to use

1. Install the module.

    ```console
    npm i @pscoped/ngx-pub-sub --save
    ```

    > I had to scope ( `@pscoped` ) my package with something, because another package having similar name was already published for AngularJS (v 1.x)

2. Import `NgxPubSub` module into your module

    ```typescript
    import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';

    @NgModule({
        ....
        imports: [
            .....
            NgxPubSubModule
        ],
        ....
    })
    export class AppModule {}
    ```

3. Register the events if you'd like to support events with last or historical values.

    ```typescript
    export class AppComponent {
        latestEvent = 'randomLast';
        historicalEvent = 'randomHistory';

        constructor(pubsubSvc: NgxPubSubService) {
            pubsubSvc.registerEventWithHistory(this.historicalEvent, 6);
            pubsubSvc.registerEventWithLastValue(this.latestEvent, undefined);
        }
    }
    ```

4. Use `NgxPubSubService` and subscribe to your event.

    ```typescript
    export class SubscriberComponent implements OnDestroy {
        
        subscription1: Subscription;
        subscription2: Subscription;
        subscription3: Subscription;
        myNumber1: number;
        myNumber2: number;
        myNumber3: number;

        constructor(private pubSub: NgxPubSubService) { }

        ngOnInit() {
            this.subscription1 = this.pubSub.subscribe('randomNormal',
                                    data => this.myNumber1 = data);
            this.subscription2 = this.pubSub.subscribe('randomHistory',
                                    data => this.myNumber2 = data);
            this.subscription3 = this.pubSub.subscribe('randomLast',
                                    data => this.myNumber3 = data);
        }

        ngOnDestroy() {
            this.subscription1.unsubscribe();
            this.subscription2.unsubscribe();
            this.subscription3.unsubscribe();
        }
    }
    ```

5. And publish the event.

    ```typescript
    export class PublisherComponent {

        normalEvent = 'randomNormal';
        historicalEvent = 'randomHistory';
        latestEvent = 'randomLast';

        random: number;
        constructor(private pubsub: NgxPubSubService) { }

        publish() {
            this.random = Math.floor(Math.random() * 100);

            this.pubsub.publishEvent(this.normalEvent, this.random);
            this.pubsub.publishWithHistory(this.historicalEvent, this.random);
            this.pubsub.publishWithLast(this.latestEvent, this.random);
        }
    }
    ```

## Ground Rules

> Note: Here normal event means event's data will be vanished if no subscriber is there at the time of publishing the event. Historical values or last value will not be provided to the subscribers for such events.

1. An event has to be registered if last value or historical values have to be supported.
2. Once event name is registered for a type (to support either normal, last value support or historical value support), the same name cannot be used to publish/subscribe for another type unless it is completed by someone.
3. Normal events need not to be registered. If event is not found at the time of publishing or subscribing, the same will be registered as a normal event.
4. You can register the events anywhere in your code, however, we recommand to have it at one place only,
i.e. inside the root component of your application, like what you see in [app.component.ts](https://github.com/paritosh64ce/ngx-pub-sub/blob/master/apps/test-app/src/app/app.component.ts)

If an event having name 'randomHistory' is registered to support historical values, the same event name cannot be used to register or publish event with other type (i.e. last value support or normal event) unless it is completed programmatically.

## Developing and Contributing
> The repository also comes with the demo application. Check the Github repo link.

### Development server

```console
git clone https://github.com/paritosh64ce/ngx-pub-sub.git
cd ngx-pub-sub
npm i
ng serve
```

This will start the server for the demo application.

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Below is how the demo application looks like.

![Demo Screenshot](https://raw.githubusercontent.com/paritosh64ce/ngx-pub-sub/master/apps/test-app/src/assets/demo-img-2.gif "ngx-pub-sub demo screenshot")


### Running unit tests

1. Run `npm run test:lib` to execute the `ngx-pub-sub` library test cases.
2. Run `npm run coverage:lib` to generate the code-coverage report.


> Make sure to update the tests if you submit a PR, the CI will be affected if any of the tests fails.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).


## TODO:
1. Coverage integration with CI



## Change Log

> 1.0.0 - 1.0.3:  
> Basic functionality and README file updates

> 2.0.0
> Now subscribers can have last or historical values for the event published based on the type the event is registered with.

> 2.0.1 - 2.0.3
> Dev-dependencies and README file updates

> 3.0.0
> Dependencies updated with Angular 8

### Like this work? [Star this repository](https://github.com/paritosh64ce/ngx-pub-sub/stargazers) on GitHub

### Got any issue or some feature request on your mind? Post it [here](https://github.com/paritosh64ce/ngx-pub-sub/issues)!

## License

MIT @ [paritosh64ce](https://github.com/paritosh64ce)

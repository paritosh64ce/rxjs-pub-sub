# 🔔 rxjs-pub-sub 🔔

Event publish - subscribe mechanism as Javascript library using Observable. You can publish your event along with any data to all the subscribers of your event (event identification is being done using event-name as string). This library also supports historical published values for the new subscribers.
This library can work with any of your JavaScript code. You just need RxJs along with it. 

[![npm](https://img.shields.io/npm/v/@pscoped/rxjs-pub-sub.svg)](https://www.npmjs.com/package/@pscoped/rxjs-pub-sub)
[![npm](https://img.shields.io/npm/dt/@pscoped/rxjs-pub-sub.svg)](https://www.npmjs.com/package/@pscoped/rxjs-pub-sub)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/paritosh64ce/rxjs-pub-sub/blob/master/LICENSE)
[![PayPal Donate](https://img.shields.io/badge/donate-PayPal.me-ff69b4.svg)](https://www.paypal.me/paritosh64patel)

[![Build Status](https://github.com/paritosh64ce/rxjs-pub-sub/actions/workflows/main.yml/badge.svg)](https://github.com/paritosh64ce/rxjs-pub-sub/actions/workflows/main.yml)
[![Static Badge](https://img.shields.io/badge/Coverage-98.18%25-brightgreen)](https://github.com/paritosh64ce/rxjs-pub-sub/blob/master/coverage/rxjs-pub-sub/index.html)



## [Live Demo Link](https://pscoped-rxjs-pub-sub-demo.stackblitz.io)

## What makes this package special?

1. Simplicity

    - Publish you data
    ```typescript
    rxjsPubSub.publishEvent('eventName', data)
    ```
    - Subscribe to your event
    ```typescript
    rxjsPubSub.subscribe('eventName', (data: any) => { /* your callback */ })
    ```

2. Unique feature
    - This service also supports historical values even for new subscribers.
    ```typescript
    rxjsPubSub.publishWithHistory('eventName', data)   /* new subscribers can have historical values */
    rxjsPubSub.publishWithLast('eventName', data)      /* new subscribers can have last published values */
    ```

## How to use

1. Install the package.

    ```console
    npm i @pscoped/rxjs-pub-sub --save
    ```

    > I had to scope ( `@pscoped` ) my package with something, because another package having similar name was already published.

2. - Import the service in your project; be it Angular, React, Vue, or even Vanilla JavaScript code
    ``` typescript
    import { rxjsPubSub } from '@pscoped/rxjs-pub-sub';
    ```

3. Register the events if you'd like to support events with last or historical values.

    ```typescript
    const latestEvent = 'randomLast';
    const historicalEvent = 'randomHistory';

    rxjsPubSub.registerEventWithHistory(historicalEvent, 6);
    rxjsPubSub.registerEventWithLastValue(latestEvent, undefined);
    ```

4. Use `rxjsPubSub` and subscribe to your event.

    ```typescript
    export class SubscriberComponent implements OnDestroy {
        
        subscription1: Subscription;
        subscription2: Subscription;
        subscription3: Subscription;
        myNumber1: number;
        myNumber2: number;
        myNumber3: number;

        constructor() { }

        ngOnInit() {
            this.subscription1 = rxjsPubSub.subscribe('randomNormal', data => this.myNumber1 = data);
            this.subscription2 = rxjsPubSub.subscribe('randomHistory', data => this.myNumber2 = data);
            this.subscription3 = rxjsPubSub.subscribe('randomLast', data => this.myNumber3 = data);
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
        constructor() { }

        publish() {
            this.random = Math.floor(Math.random() * 100);

            rxjsPubSub.publishEvent(this.normalEvent, this.random);
            rxjsPubSub.publishWithHistory(this.historicalEvent, this.random);
            rxjsPubSub.publishWithLast(this.latestEvent, this.random);
        }
    }
    ```
> Note: Here Angular code is shown just for the sake of an example. You could use this library with any of your Javascript project (React, Vue, etc) including vanilla JavaScript and TypeScript.


## Ground Rules

> Note: Here normal event means event's data will be vanished if no subscriber is there at the time of publishing the event. Historical values or last value will not be provided to the subscribers for such events.

1. An event has to be registered if last value or historical values have to be supported.
2. Once event name is registered for a type (to support either normal, last value support or historical value support), the same name cannot be used to publish/subscribe for another type unless it is completed by someone.
3. Normal events need not to be registered. If event is not found at the time of publishing or subscribing, the same will be registered as a normal event.
4. You can register the events anywhere in your code, however, we recommand to have it at one place only,
i.e. inside the root component of your application, like what you see in [app.component.ts](https://github.com/paritosh64ce/rxjs-pub-sub/blob/master/apps/test-app/src/app/app.component.ts)

If an event having name 'randomHistory' is registered to support historical values, the same event name cannot be used to register or publish event with other type (i.e. last value support or normal event) unless it is completed programmatically.

### Below is how the demo application looks like.

![Demo Screenshot](https://raw.githubusercontent.com/paritosh64ce/rxjs-pub-sub/master/apps/test-app/src/assets/demo-img-2.gif "rxjs-pub-sub demo screenshot")  
 _@pscoped/ngx-pub-sub or @pscoped/rxjs-pub-sub - both's demo apps are kind of same_

## About the library
* Motivation: https://www.npmjs.com/package/@pscoped/ngx-pub-sub
  * This library has been used by many Angular developers.
  * I wanted to make it available to even broader audience.


## Developing and Contributing
> The repository also comes with the demo application. Check the Github repo link.

### Development server

```console
git clone https://github.com/paritosh64ce/rxjs-pub-sub.git
cd rxjs-pub-sub
npm i
npm start
```

This will start the server for the demo application.

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


### Running unit tests

1. Run `npm run test:lib` to execute the `rxjs-pub-sub` library test cases.
2. Run `npm run coverage:lib` to generate the code-coverage report.


> Make sure to update the tests if you submit a PR, the CI will be affected if any of the tests fails.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).


## TODO:
1. Coverage badge for README
1. Lint integration


## Change Log

> 0.0.1 - 1.0.1:  
> Basic functionality from `@pscoped/ngx-pub-sub` and README file updates

### Like this work? [Star this repository](https://github.com/paritosh64ce/rxjs-pub-sub/stargazers) on GitHub

### Support
[![Donate](https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif)](https://www.paypal.me/paritosh64patel)

Motivate, Become a sponsor and get your logo on README with a link to your site. [Become a sponsor](https://simplifyingtechblog.wordpress.com/contact/)

### Got any issue or some feature request on your mind? Post it [here](https://github.com/paritosh64ce/rxjs-pub-sub/issues)!

## License

MIT @ [paritosh64ce](https://github.com/paritosh64ce)

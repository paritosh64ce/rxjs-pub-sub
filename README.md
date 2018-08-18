# NgxPubSub

Event publish - subscribe mechanism as Angular service using Observable. You can publish your event along with any data to all the subscribers of your event (event identification is being done using event-name as string).

[![Build Status](https://travis-ci.com/paritosh64ce/ngx-pub-sub.svg?branch=master)](https://travis-ci.com/paritosh64ce/ngx-pub-sub)
[![npm](https://img.shields.io/npm/v/@pscoped/ngx-pub-sub.svg)](https://www.npmjs.com/package/@pscoped/ngx-pub-sub)
[![npm](https://img.shields.io/npm/dt/@pscoped/ngx-pub-sub.svg)](https://www.npmjs.com/package/@pscoped/ngx-pub-sub)
[![npm](https://img.shields.io/github/license/paritosh64ce/ngx-pub-sub.svg)](https://github.com/paritosh64ce/ngx-pub-sub/blob/master/LICENSE)


[![Dependency Status](https://img.shields.io/david/paritosh64ce/ngx-pub-sub.svg)](https://david-dm.org/paritosh64ce/ngx-pub-sub.svg)
[![devDependency Status](https://img.shields.io/david/dev/paritosh64ce/ngx-pub-sub.svg)](https://david-dm.org/paritosh64ce/ngx-pub-sub.svg#info=devDependencies)


## How to use

Install the module.

    npm i @pscoped/ngx-pub-sub --save

> I had to scope ( `@pscoped` ) my package with something, because another package having similar name was already published for AngularJS (v 1.x)

Import `NgxPubSub` module into your module

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


Use `NgxPubSubService` and subscribe to your event.

    export class SubscriberComponent implements OnDestroy {
      
      subscription: Subscription;
      myNumber: number;

      constructor(private pubSub: NgxPubSubService) { }

      ngOnInit() {
        this.subscription = this.pubSub.getEventObservable('randomNumber')
          .subscribe(data => this.myNumber = data);
      }

      ngOnDestroy() {
        this.subscription.unsubscribe();
      }
    }

And publish the event.

    export class PublisherComponent {

      eventName = 'randomNumber';
      random: number;
      constructor(private pubsub: NgxPubSubService) { }

      publish() {
        this.random = Math.floor(Math.random() * 100);
        this.pubsub.publishEvent(this.eventName, this.random);
      }
    }


> The repository also comes with the test application. Check the Github repo link.

## Development server

After having the source code, run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Below is how the demo application looks like.

![Demo Screenshot](https://raw.githubusercontent.com/paritosh64ce/ngx-pub-sub/master/apps/test-app/src/assets/demo-img.JPG "ngx-pub-sub demo screenshot")

## Running unit tests

1. Run `npm run test:lib` to execute the `ngx-pub-sub` library test cases.
2. Run `npm run coverage:lib` to generate the code-coverage report.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).

## License

MIT @ [paritosh64ce](https://github.com/paritosh64ce)
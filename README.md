# NgxPubSub

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).

## Event publish-subscribe mechnism for Angular

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

![Demo Screenshot](./apps/test-app/src/assets/demo-img.JPG "ngx-pub-sub demo screenshot")

## Running unit tests

1. Run `npm run test:lib` to execute the `ngx-pub-sub` library test cases.
2. Run `npm run coverage:lib` to generate the code-coverage report.

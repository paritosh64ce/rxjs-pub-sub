import { Component } from '@angular/core';
import { rxjsPubSub } from '@pscoped/rxjs-pub-sub';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-pub-sub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '@pscoped/rxjs-pub-sub Demo App';
  normalEvent = 'randomNormal';
  latestEvent = 'randomLast';
  historicalEvent = 'randomHistory';

  constructor() {
    rxjsPubSub.registerEventWithHistory(this.historicalEvent, 6);
    rxjsPubSub.registerEventWithLastValue(this.latestEvent, undefined);
  }
}

import { Component } from '@angular/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-pub-sub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-pub-sub Demo App';
  normalEvent = 'randomNormal';
  latestEvent = 'randomLast';
  historicalEvent = 'randomHistory';

  constructor(pubsubSvc: NgxPubSubService) {
    pubsubSvc.registerEventWithHistory(this.historicalEvent, 6);
    pubsubSvc.registerEventWithLastValue(this.latestEvent, undefined);
  }
}

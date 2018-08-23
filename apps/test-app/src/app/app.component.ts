import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxPubSubService } from '@ngx-pub-sub/ngx-pub-sub';

@Component({
  selector: 'ngx-pub-sub-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-pub-sub Demo App';
  latestEvent = 'randomLast';
  historicalEvent = 'randomHistory';

  constructor(pubsubSvc: NgxPubSubService) {
    pubsubSvc.registerEventWithHistory(this.historicalEvent, 4);
    pubsubSvc.registerEventWithLatestValue(this.latestEvent, undefined);
  }
}

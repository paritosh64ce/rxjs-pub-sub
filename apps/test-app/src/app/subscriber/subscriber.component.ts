import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxPubSubService } from '@ngx-pub-sub/ngx-pub-sub';

@Component({
  selector: 'ngx-pub-sub-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent {

  subscription: Subscription;
  myNumber: number;
  myColor: string;
  isSubscribedFirstTime: boolean;
  @ViewChild('btnGroup') btnGroup;

  colors = ['primary', 'accent', 'warn'];
  colorCounter = 0;

  constructor(private pubSub: NgxPubSubService) {
    this.isSubscribedFirstTime = false;    
  }

  subscribeEvent() {
    this.isSubscribedFirstTime = true;
    // dirty check has to be put coz check in template is not working
    if (this.btnGroup.value === 1) return;

    console.log('subscribed');
    this.subscription = this.pubSub.getEventObservable('randomNumber')
      .subscribe(data => {
        this.colorCounter++;
        this.myColor = this.colors[this.colorCounter % this.colors.length];
        this.myNumber = data;
      });
  }

  unsubscribeEvent() {
    // dirty check has to be put coz check in template is not working
    if (this.btnGroup.value === 0) return;

    console.log('unsubscribed');
    this.subscription.unsubscribe();
  }
}

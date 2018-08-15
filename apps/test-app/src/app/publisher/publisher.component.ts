import { Component, OnInit } from '@angular/core';
import { NgxPubSubService } from '@ngx-pub-sub/ngx-pub-sub';

@Component({
  selector: 'ngx-pub-sub-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

  eventName = 'randomNumber';
  random: number;
  constructor(private pubsub: NgxPubSubService) { }

  generateRandom() {
    this.random = Math.floor(Math.random() * 100);
    this.publish();
  }

  publish() {
    this.pubsub.publishEvent(this.eventName, this.random);
  }

  ngOnInit() {
  }

}

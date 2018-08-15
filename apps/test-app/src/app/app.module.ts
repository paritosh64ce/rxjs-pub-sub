import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule,
  MatButtonToggleModule, MatCardModule, MatIconModule, MatChipsModule
 } from '@angular/material';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { NgxPubSubModule } from '@ngx-pub-sub/ngx-pub-sub';
import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberComponent } from './subscriber/subscriber.component';

@NgModule({
  declarations: [AppComponent, PublisherComponent, SubscriberComponent],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule, FlexLayoutModule,
    MatButtonModule, MatInputModule, MatFormFieldModule,
    MatButtonToggleModule, MatCardModule, MatIconModule,
    MatChipsModule,
    NxModule.forRoot(),
    NgxPubSubModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

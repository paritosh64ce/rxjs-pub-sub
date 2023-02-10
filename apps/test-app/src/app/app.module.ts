import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
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
    NgxPubSubModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

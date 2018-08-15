import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPubSubService } from './services/ngx-pub-sub.service';

@NgModule({
  imports: [CommonModule],
  providers: [NgxPubSubService]
})
export class NgxPubSubModule {}

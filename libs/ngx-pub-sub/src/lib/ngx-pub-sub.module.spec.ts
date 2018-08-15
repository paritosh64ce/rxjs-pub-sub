import { async, TestBed } from '@angular/core/testing';
import { NgxPubSubModule } from './ngx-pub-sub.module';
import { NgxPubSubService } from './services/ngx-pub-sub.service';

describe('NgxPubSubModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxPubSubModule],
      providers: [NgxPubSubService]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxPubSubModule).toBeDefined();
  });
});

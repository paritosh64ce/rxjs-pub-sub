import { TestBed, inject } from '@angular/core/testing';

import { NgxPubSubService } from './ngx-pub-sub.service';

describe('NgxPubSubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxPubSubService]
    });
  });

  it('should be created', inject(
    [NgxPubSubService],
    (service: NgxPubSubService) => {
      expect(service).toBeTruthy();
    }
  ));
});

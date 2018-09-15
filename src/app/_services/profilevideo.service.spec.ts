import { TestBed, inject } from '@angular/core/testing';

import { ProfilevideoService } from './profilevideo.service';

describe('ProfilevideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfilevideoService]
    });
  });

  it('should be created', inject([ProfilevideoService], (service: ProfilevideoService) => {
    expect(service).toBeTruthy();
  }));
});

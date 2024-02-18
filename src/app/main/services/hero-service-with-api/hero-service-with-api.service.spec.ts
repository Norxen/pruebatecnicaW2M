import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroServiceWithApiService } from './hero-service-with-api.service';

describe('HeroServiceWithApiService', () => {
  let service: HeroServiceWithApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HeroServiceWithApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

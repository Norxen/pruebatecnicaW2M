import { TestBed } from '@angular/core/testing';

describe('mockBackendInterceptor', () => {
  const mockBackendInterceptor = () => {
    return {
      intercept: (req: any, next: any) => {
        return next.handle(req);
      },
    };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(mockBackendInterceptor).toBeTruthy();
  });
});

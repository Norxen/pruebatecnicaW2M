import { HttpInterceptorFn } from '@angular/common/http';
//TODO: Implement interceptor for HTTP requests
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

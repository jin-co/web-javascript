import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService:UserService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
    });
    return next.handle(authRequest);
  }
}

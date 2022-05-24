import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthIntercepter implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const alteredReq = req.clone({
      headers: req.headers.set(
        'authorization',
        'Bearer ' + this.userService.getToken()
      ),
    });
    return next.handle(alteredReq);
  }
}

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.userService.getToken()
    const authRequest = req.clone({
        headers: req.headers.set('authorization', 'Bearer ' + authToken) // adds header(adding Bearer is convention)
    })

    // return next.handle(req);
    return next.handle(authRequest);
  }
}

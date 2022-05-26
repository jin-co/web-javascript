import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
        catchError((err:HttpErrorResponse) => {
            console.log('error: ', err.message)
            alert(err.error.message)
            return throwError(() => new Error(err.error))
        })
    )


    // return next.handle(req).pipe(
    //   catchError((err: HttpErrorResponse) => {
    //       alert(err)
    //     return throwError(err);
    //   })
    // );
  }
}

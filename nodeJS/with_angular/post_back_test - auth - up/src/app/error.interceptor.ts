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
import { ErrorComponent } from './components/shared/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        // alert(err.error.message)
        let errorMessage = 'Error occurred'
        if(err.error.message) {
            errorMessage = err.error.message
        }
        this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
        return throwError(() => new Error(err.error));
      })
    );

    // return next.handle(req).pipe(
    //   catchError((err: HttpErrorResponse) => {
    //       alert(err)
    //     return throwError(err);
    //   })
    // );
  }
}

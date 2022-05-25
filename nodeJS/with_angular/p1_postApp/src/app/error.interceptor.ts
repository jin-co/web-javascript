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

// interceptor can also be used to watch incoming responses

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('error interceptor: ', err);
        // alert(err.error.message);
        let errorMessage = 'Error';
        if (err.error.message) {
          errorMessage = err.error.message;
        }
        this.dialog.open(ErrorComponent, {
          data: {
            message: errorMessage,
          },
        });
        return throwError(err);
      })
    );
  }
}

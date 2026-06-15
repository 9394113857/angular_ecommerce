import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import {
  catchError,
  switchMap
} from 'rxjs/operators';

import { AuthenticationService }
from '../services/authentication.service';

@Injectable()
export class AuthInterceptor
implements HttpInterceptor {

  constructor(
    private authService:
      AuthenticationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token =
      localStorage.getItem(
        'token'
      );

    let authReq = req;

    if (token) {

      authReq = req.clone({
        setHeaders: {
          Authorization:
            `Bearer ${token}`
        }
      });
    }

    return next.handle(
      authReq
    ).pipe(

      catchError(
        (error:
          HttpErrorResponse) => {

          const refreshToken =
            localStorage.getItem(
              'refresh_token'
            );

          if (
            error.status === 401 &&
            refreshToken &&
            !req.url.includes(
              '/refresh'
            )
          ) {

            return this
              .authService
              .refreshToken()
              .pipe(

                switchMap(
                  (response) => {

                    localStorage.setItem(
                      'token',
                      response.access_token
                    );

                    const retryReq =
                      req.clone({
                        setHeaders: {
                          Authorization:
                            `Bearer ${response.access_token}`
                        }
                      });

                    return next.handle(
                      retryReq
                    );
                  }
                ),

                catchError(
                  () => {

                    this.authService
                      .logout();

                    return throwError(
                      () => error
                    );
                  }
                )
              );
          }

          return throwError(
            () => error
          );
        }
      )
    );
  }
}
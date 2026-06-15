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

    // Don't overwrite refresh token request  
    if (
      token &&
      !req.url.includes('/refresh')
    ) {

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

          console.log(
            'INTERCEPTOR ERROR:',
            error.status,
            req.url
          );

          const refreshToken =
            localStorage.getItem(
              'refresh_token'
            );

          if (
            error.status === 401 &&
            refreshToken &&
            !req.url.includes('/refresh')
          ) {

            console.log(
              'ATTEMPTING REFRESH'
            );

            return this
              .authService
              .refreshToken()
              .pipe(

                switchMap(
                  (response: any) => {

                    console.log(
                      'REFRESH TOKEN SUCCESS'
                    );

                    localStorage.setItem(
                      'token',
                      response.access_token
                    );

                    console.log(
                      'NEW TOKEN SAVED'
                    );

                    const retryReq =
                      req.clone({
                        setHeaders: {
                          Authorization:
                            `Bearer ${response.access_token}`
                        }
                      });

                    console.log(
                      'RETRYING ORIGINAL REQUEST'
                    );

                    return next.handle(
                      retryReq
                    );
                  }
                ),

                catchError(
                  (refreshError) => {

                    console.log(
                      'REFRESH TOKEN FAILED'
                    );

                    console.log(
                      refreshError
                    );

                    this.authService
                      .logout();

                    return throwError(
                      () => refreshError
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
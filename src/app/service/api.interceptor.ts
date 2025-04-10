import { inject } from '@angular/core';
import { HttpRequest, HttpEvent, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export function movieApiInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn)
: Observable<HttpEvent<unknown>> {
  const snackBar = inject(MatSnackBar);
  const API_URL = 'https://api.themoviedb.org/3';
  const API_KEY = 'api_key=' + '4b10cf2f8e6ed1fcb506bd3929ecee40';
  const url = req.url.replace('api_key=', API_KEY);
    if (req.url.includes('.svg')) {
      return next(req);
    }
    const request = req.clone({
      url: API_URL + url
    });
    return next(request)
    .pipe(catchError((err: HttpErrorResponse) => {
      snackBar.open(err.message, 'bottom', { duration: 5 })
      return of()
    }));
}
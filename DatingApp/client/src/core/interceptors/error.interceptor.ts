import { HttpHeaderResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ToastServiceService } from '../services/toast-service.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastServiceService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(err=> {
      toastService.error(err.status);
      throw err;
    })
  );
};

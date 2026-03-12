import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AccountServiceService } from '../services/account-service.service';
import { ToastServiceService } from '../services/toast-service.service';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountServiceService);
  const toastService = inject(ToastServiceService)

  if (accountService.currentUser()) return true;
  else {
    toastService.error('You must be logged in to view this page');
    return false;
  }
};

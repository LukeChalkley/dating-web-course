import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AccountServiceService } from './account-service.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitServiceService {
  private http = inject(HttpClient);
  protected router = inject(Router);
  protected readonly accountService = inject(AccountServiceService);

  init() {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      this.accountService.currentUser.set(user);
    }

    return of(null);
  }

  constructor() {

  }
}

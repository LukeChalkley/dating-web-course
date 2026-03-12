import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from '../../types/user';
import { tap } from 'rxjs';


/// This service will be a singleton, created when the application starts and used for the entire
/// application lifecycle, unlike components which are instantiated each time.
@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7092/api/';
  currentUser = signal<User | null>(null);

  login(creds: any) {
    return this.http.post<User>(`${this.baseUrl}account/login`, creds).pipe(
      tap(user => {
          if (user) {
            this.currentUser.set(user)
            localStorage.setItem('user', JSON.stringify(user));
          }
        })
    )
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }
}

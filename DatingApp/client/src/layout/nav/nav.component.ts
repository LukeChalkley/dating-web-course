import { Component, inject, signal } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AccountServiceService } from '../../core/services/account-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastServiceService } from '../../core/services/toast-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  protected creds: any = {};
  protected toastService = inject(ToastServiceService);
  protected readonly accountService = inject(AccountServiceService);
  protected errorMessage = signal('');
  private readonly router = inject(Router);

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (res) => {
        this.router.navigate(['/members']);
        this.toastService.success('Login successful');
        this.creds = {};
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.error(err.error);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }
}

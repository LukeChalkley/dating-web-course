import { Component, inject, signal } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AccountServiceService } from '../../core/services/account-service.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  protected creds: any = {};
  protected readonly accountService = inject(AccountServiceService);
  protected errorMessage = signal('');

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (res) => {
      },
      error: (err) => {
        this.errorMessage.set(err.error);
      }
    });
  }

  logout() {
    this.accountService.logout();
  }
}

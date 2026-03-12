import { Component, inject, signal } from '@angular/core';
import { AccountServiceService } from '../../core/services/account-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  protected accountService = inject(AccountServiceService);
  protected registerMode = signal(false);

  showRegister(toShow: boolean) {
    this.registerMode.set(toShow);
  }

}

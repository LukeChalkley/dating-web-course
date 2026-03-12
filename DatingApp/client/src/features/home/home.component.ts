import { Component, inject, Input, signal } from '@angular/core';
import { AccountServiceService } from '../../core/services/account-service.service';
import { Register } from '../account/register/register.component';
import { User } from '../../types/user';
import { required } from '@angular/forms/signals';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Register],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  protected accountService = inject(AccountServiceService);
  protected registerMode = signal(false);


  showRegister(toShow: boolean) {
    this.registerMode.set(toShow);
  }
}

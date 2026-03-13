import { Component, OnInit, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { NavComponent } from '../layout/nav/nav.component';
import { AccountServiceService } from '../core/services/account-service.service';
import { User } from '../types/user';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { TestErrorsComponent } from '../features/test-errors/test-errors.component';

@Component({
  selector: 'app-root',
  imports: [NavComponent, RouterOutlet, NgClass, TestErrorsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected router = inject(Router);
  private readonly accountService = inject(AccountServiceService);
  protected readonly title = signal('Dating Client Members');
  protected readonly message = signal('Reading members...');
  protected readonly memberCount = signal(0);
  protected readonly members = signal<User[]>([]);
  protected readonly error = signal<string>('');
  protected readonly showError = signal(false);

  async ngOnInit() {
    this.members.set(await this.getAllMembers());
    this.memberCount.set(this.members().length);

    setTimeout(() => this.message.set(''), 2000);
  }

  async getAllMembers() {
    try {
      return await lastValueFrom(this.http.get<User[]>('https://localhost:7092/api/AppUsers/'));
    } catch (err) {
      this.error.set('Error getting members');
      this.showError.set(true);
      throw err;
    }
  }
}

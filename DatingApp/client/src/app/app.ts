import { Component, OnInit, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = signal('Dating Client');
  protected readonly message = signal('Reading members...');
  protected readonly memberCount = signal(0);
  protected readonly members = signal<any>([]);
  protected readonly error = signal<string>('');

  async ngOnInit() {
    this.members.set(await this.getAllMembers());
    this.memberCount.set(this.members().length);
    this.message.set('Successfully read members.');
  }

  async getAllMembers() {
    try { return await lastValueFrom(this.http.get('https://localhost:7092/api/AppUsers/')); }
    catch (err) {
      this.error.set('Error getting members');
      throw err;
    }
  }
}

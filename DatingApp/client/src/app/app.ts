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
  protected readonly title = signal('Dating Client Members');
  protected readonly message = signal('Reading members...');
  protected readonly memberCount = signal(0);
  protected readonly members = signal<any>([]);
  protected readonly error = signal<string>('')
  protected readonly hasFinishedReading = signal(false);
  protected readonly showError = signal(false);

  async ngOnInit() {
    await this.sleep(5000);
    this.members.set(await this.getAllMembers());
    this.memberCount.set(this.members().length);
    this.hasFinishedReading.set(true);
  }

  async getAllMembers() {
    try { return await lastValueFrom(this.http.get('https://localhost:7092/api/AppUsers/')); }
    catch (err) {
      this.error.set('Error getting members');
      this.showError.set(true);
      throw err;
    }
  }

  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7092/api/';

  get404() {
    this.http.get(`${this.baseUrl}/buggy/not-found`).subscribe(
      {
        next: (res) => console.log(res),
        error: (err) => console.error(err)
      });
  }

  get400() {
    this.http.get(`${this.baseUrl}/buggy/bad-request`).subscribe(
      {
        next: (res) => console.log(res),
        error: (err) => console.error(err)
      });
  }
}

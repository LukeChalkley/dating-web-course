import { Component, inject, input, output, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RegisterCredentials, User } from '../../../types/user';
import { AccountServiceService } from '../../../core/services/account-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class Register {
  registrationActive = output<boolean>();
  protected creds ={} as RegisterCredentials;
  protected readonly accountService = inject(AccountServiceService);

  register() {
    this.accountService.register(this.creds).subscribe({
      next: (res) => {
        console.log(res);
        this.cancel();
      },
      error: (err) => {
        console.error(err);
      }
      }
    );
  }

  cancel() {
    this.registrationActive.emit(false);
  }
}

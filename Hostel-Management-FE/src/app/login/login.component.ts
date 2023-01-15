import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  isLoggedIn = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private storageService: StorageService,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.authService.login(this.validateForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.message.success('Login Successfull!');
          this.storageService.saveUser(data.data.token);
          this.isLoggedIn = true;
          if (data.data.user.role === 'Student') {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/admin/user-management']);
          }
        },
        error: (err) => {
          this.message.error('Login Failed! Try Again!');
        },
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      if (this.storageService.getUser().role === 'Student') {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/admin/user-management']);
      }
    }

    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}

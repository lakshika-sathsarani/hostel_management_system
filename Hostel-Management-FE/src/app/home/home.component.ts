import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private userService: UserService
  ) {}
  redirect(path: string): void {
    this.router.navigate([path]);
  }

  getUser(): void {
    const userId = this.storageService.getUser()._id;
    this.userService.getUser(userId).subscribe({
      next: (data) => {
        this.user = data.data;
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  ngOnInit(): void {
    this.getUser();
  }
}

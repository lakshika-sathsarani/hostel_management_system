import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private storageService: StorageService) {}

  logout(): void {
    this.storageService.clean();
    this.router.navigate(['/']);
  }
  redirect(path: string): void {
    this.router.navigate([path]);
  }
}

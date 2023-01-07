import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css'],
})
export class SiderComponent {
  location: any;
  constructor(
    location: Location,
    private storageService: StorageService,
    private router: Router
  ) {
    this.location = location.path();
  }

  logout(): void {
    this.storageService.clean();
    this.router.navigate(['/']);
  }
}

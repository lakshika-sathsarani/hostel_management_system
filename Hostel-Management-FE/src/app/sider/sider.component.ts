import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css'],
})
export class SiderComponent {
  location: any;
  constructor(location: Location) {
    this.location = location.path();
  }
}

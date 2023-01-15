import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  tableData: any[] = [];

  constructor(
    private userService: UserService,
    private message: NzMessageService
  ) {}

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.tableData = data.data;
      },
      error: (e) => {
        console.log('error', e);
      },
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  deleteUser(id: string): void {
    this.userService.userDelete(id).subscribe({
      next: () => {
        this.message.success('User Deleted!');
        this.getUsers();
      },
      error: (e) => {
        console.log('error', e);
        this.message.error('Try Again!');
      },
    });
  }
}

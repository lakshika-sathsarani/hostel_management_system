import { Component, Injectable, OnInit } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { HostelService } from '../_services/hostel.service';
import { RoomService } from '../_services/room.service';
import { BookingService } from '../_services/booking.service';
import { StorageService } from '../_services/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class BookingComponent implements OnInit {
  date = null;
  radioValue = '0';
  validateForm!: UntypedFormGroup;
  today = new Date();
  total = 4000;
  hostels: any[] = [];
  rooms: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private hostelService: HostelService,
    private roomService: RoomService,
    private bookingService: BookingService,
    private storageService: StorageService,
    private message: NzMessageService,
    private router: Router
  ) {}

  getHostels() {
    this.hostelService.getHostels().subscribe({
      next: (data) => {
        data.data.forEach((item: any) => {
          this.hostels.push({ label: item.name, value: item.id });
        });
      },
      error: (e) => {
        console.log('Error', e);
      },
    });
  }

  getRoomsByHostel(id: string) {
    this.roomService.getRoomByHostelId(id).subscribe({
      next: (data) => {
        data.data.forEach((item: any) => {
          this.rooms.push({ label: item.id, value: item.id });
        });
      },
      error: (e) => {
        console.log('Error', e);
      },
    });
  }

  onHostelChange(value: string): void {
    this.rooms = [];
    this.getRoomsByHostel(value);
  }

  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) < 0;

  onChange(value: string): void {
    if (value === '1') {
      this.total = this.total + 2000;
    } else {
      this.total = this.total - 2000;
    }
  }

  reservation(data: any): void {
    const userId = this.storageService.getUser()._id;
    const hostel = { ...data, payment: this.total };
    this.bookingService.reservation(hostel, userId).subscribe({
      next: () => {
        this.message.success('Successfully Reserved!');
        this.router.navigate(['/home']);
      },
      error: (e) => {
        console.log('Error', e);
        this.message.error('Failed! Try Again');
      },
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.reservation(this.validateForm.value);
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
    this.getHostels();
    this.validateForm = this.fb.group({
      stayFrom: [null],
      option: [this.radioValue],
      hostelId: [null, [Validators.required]],
      roomId: [null, [Validators.required]],
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RoomService } from '../_services/room.service';
import { HostelService } from '../_services/hostel.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent {
  isVisible = false;
  validateForm!: UntypedFormGroup;
  hostels: any[] = [];
  listOfData: any[] = [];
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  constructor(
    private fb: UntypedFormBuilder,
    private roomService: RoomService,
    private hostelService: HostelService,
    private message: NzMessageService
  ) {}

  addRoom(data: any, e: MouseEvent) {
    this.roomService.addRoom(data).subscribe({
      next: () => {
        this.message.success('Room Added Sucessfully!');
        this.getHostels();
        this.getRooms();
        this.handleCancel(e);
      },
      error: (e) => {
        console.log('Error', e);
        this.message.error('Failed! Try Again');
      },
    });
  }

  getHostels() {
    this.hostelService.getHostels().subscribe({
      next: (data) => {
        data.data.forEach((item: any) => {
          this.hostels.push({ label: item.id, value: item.id });
        });
      },
      error: (e) => {
        console.log('Error', e);
      },
    });
  }

  getRooms() {
    this.roomService.getRooms().subscribe({
      next: (data) => {
        this.listOfData = data.data;
      },
      error: (e) => {
        console.log('Error', e);
      },
    });
  }

  deleteRoom(id: string) {
    this.roomService.deletRoom(id).subscribe({
      next: () => {
        this.message.success('Delete Successfull!');
        this.getRooms();
      },
      error: (e) => {
        console.log('Error', e);
        this.message.error('Failed! Try Again');
      },
    });
  }

  submitForm(e: MouseEvent): void {
    if (this.validateForm.valid) {
      this.addRoom(this.validateForm.value, e);
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
    this.validateForm = this.fb.group({
      hostelId: [null, [Validators.required]],
      id: [null, [Validators.required]],
      space: [null, [Validators.required]],
    });
    this.getRooms();
    this.getHostels();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(e: MouseEvent): void {
    this.isVisible = false;
    this.resetForm(e);
  }
}

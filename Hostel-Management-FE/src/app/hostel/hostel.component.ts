import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { HostelService } from '../_services/hostel.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-hostel',
  templateUrl: './hostel.component.html',
  styleUrls: ['./hostel.component.css'],
})
export class HostelComponent {
  isVisible = false;
  validateForm!: UntypedFormGroup;
  listOfData: any[] = [];
  update: boolean = false;
  selected: any;

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
    private hostelService: HostelService,
    private message: NzMessageService
  ) {}

  manageHostel(data: any, e: MouseEvent) {
    if (this.update) {
      this.hostelService.updateHostel(data, this.selected._id).subscribe({
        next: () => {
          this.message.success('Hostel Updated Sucessfully!');
          this.getHostels();
          this.handleCancel(e);
        },
        error: (e) => {
          console.log('Error', e);
          this.message.error('Failed! Try Again');
        },
      });
    } else {
      this.hostelService.addHostel(data).subscribe({
        next: () => {
          this.message.success('Hostel Added Sucessfully!');
          this.getHostels();
          this.handleCancel(e);
        },
        error: (e) => {
          console.log('Error', e);
          this.message.error('Failed! Try Again');
        },
      });
    }
  }

  getHostels() {
    this.hostelService.getHostels().subscribe({
      next: (data) => {
        this.listOfData = data.data;
      },
      error: (e) => {
        console.log('Error', e);
      },
    });
  }

  deleteHostel(id: string) {
    this.hostelService.deletHostel(id).subscribe({
      next: () => {
        this.message.success('Delete Successfull!');
        this.getHostels();
      },
      error: (e) => {
        console.log('Error', e);
        this.message.error('Failed! Try Again');
      },
    });
  }

  submitForm(e: MouseEvent): void {
    if (this.validateForm.valid) {
      this.manageHostel(this.validateForm.value, e);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateModal(data: any): void {
    this.update = true;
    this.selected = data;
    this.validateForm = this.fb.group({
      name: [data.name, [Validators.required]],
      id: [data.id, [Validators.required]],
      noOfRooms: [data.noOfRooms, [Validators.required]],
      type: [data.type, [Validators.required]],
    });
    this.showModal();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      id: [null, [Validators.required]],
      noOfRooms: [null, [Validators.required]],
      type: [null, [Validators.required]],
    });
    this.getHostels();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(e: MouseEvent): void {
    this.isVisible = false;
    this.resetForm(e);
    this.update = false;
    this.selected = undefined;
  }
}

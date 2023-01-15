import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookingService } from '../_services/booking.service';

const API = 'http://localhost:4000/api';

describe('BookingComponent', () => {
  let service: BookingService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BookingService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should book a hostel', () => {
    const id = 'IT1000';
    const data = {
      hostelId: 'FC003',
      roomId: '100',
      payment: '2000',
      stayFrom: '16-01-2023',
      option: 0,
    };
    service.reservation(data, id).subscribe((res) => {
      expect(res).toEqual(data);
    });
    const req = httpController.expectOne({
      method: 'PATCH',
      url: `${API}/user/${id}`,
    });
    req.flush(data);
  });
});

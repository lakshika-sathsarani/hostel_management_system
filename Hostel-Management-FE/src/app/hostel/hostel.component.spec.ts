import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HostelService } from '../_services/hostel.service';

const API = 'http://localhost:4000/api';

describe('HostelComponent', () => {
  let service: HostelService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HostelService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should add a hostel', () => {
    const data = {
      id: 'FC003',
      name: 'Faculty of computing M3',
      noOfRooms: 5,
      type: 'Male',
    };
    service.addHostel(data).subscribe((res) => {
      expect(res).toEqual(data);
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: `${API}/hostel`,
    });
    req.flush(data);
  });
});

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RoomService } from '../_services/room.service';

const API = 'http://localhost:4000/api';

describe('RoomsComponent', () => {
  let service: RoomService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RoomService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should add a room', () => {
    const data = {
      id: '100',
      space: 4,
      availability: true,
    };
    service.addRoom(data).subscribe((res) => {
      expect(res).toEqual(data);
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: `${API}/room`,
    });
    req.flush(data);
  });
});

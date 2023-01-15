import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from '../_services/user.service';

const API = 'http://localhost:4000/api';

describe('UserManagementComponent', () => {
  let service: UserService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should delete an user', () => {
    const id = 'IT1000';
    service.deleteUser(id).subscribe((res) => {
      expect(res).toEqual(id);
    });
    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${API}/user/${id}`,
    });
    req.flush(id);
  });
});

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from '../_services/auth.service';

const API = 'http://localhost:4000/api';

describe('LoginComponent', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should login', () => {
    const data = {
      username: 'IT1000',
      password: '12345',
    };
    service.login(data).subscribe((res) => {
      expect(res).toEqual(data);
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: `${API}/user/login`,
    });
    req.flush(data);
  });
});

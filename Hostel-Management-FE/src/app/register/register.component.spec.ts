import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from '../_services/auth.service';

const API = 'http://localhost:4000/api';

describe('RegisterComponent', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should register', () => {
    const data = {
      email: 'test1@gmail.com',
      password: '12345',
      checkPassword: '12345',
      id: 'IT20001',
      phoneNumberPrefix: ['+94'],
      mobile: '761234567',
      address: 'Balangoda',
      name: 'Test User',
    };
    service.register(data).subscribe((res) => {
      expect(res).toEqual(data);
    });
    const req = httpController.expectOne({
      method: 'POST',
      url: `${API}/user/`,
    });
    req.flush(data);
  });
});

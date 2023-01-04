import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostelComponent } from './hostel/hostel.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/user-management', component: UserManagementComponent },
  { path: 'admin/hostel-management', component: HostelComponent },
  { path: 'admin/room-management', component: RoomsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/pages/account/account.component';
import { MyBookingsComponent } from './booking/pages/my-bookings/my-bookings.component';
import { NewBookingComponent } from './booking/pages/new-booking/new-booking.component';


const routes: Routes = [
  {
    path: '',
    component: AccountComponent
  },
  {
    path: 'login',
    component: AccountComponent
  },
  {
    path: 'new-booking',
    component: NewBookingComponent
  },
  {
    path: 'my-bookings',
    component: MyBookingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

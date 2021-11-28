import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './Shared/shared.module';
import { LoginComponent } from './account/components/login/login.component';
import { AccountComponent } from './account/pages/account/account.component';
import { NewProfileComponent } from './account/components/new-profile/new-profile.component';
import { NewBookingComponent } from './booking/pages/new-booking/new-booking.component';
import { MyBookingsComponent } from './booking/pages/my-bookings/my-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    NewProfileComponent,
    NewBookingComponent,
    MyBookingsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReservationComponent } from './components/add-reservation/add-reservation.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewReservationsComponent } from './components/view-reservations/view-reservations.component';


@NgModule({
  declarations: [AddReservationComponent, ViewReservationsComponent], 
  imports: [
    CommonModule,
    SidebarModule,    
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ReservationModule { }

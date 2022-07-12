import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Booking } from 'src/app/models/booking';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.scss']
})
export class ViewReservationsComponent implements OnInit {
  public bookings: Booking[] = [];

  constructor(private authService: AuthService,
    private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.listBookingById(this.authService.getUserId()).subscribe(bookings => {
      this.bookings = bookings;
    });

  }

}

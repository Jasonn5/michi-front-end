import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDate, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/authentication/models/user';
import { UserService } from 'src/app/authentication/services/user.service';
import { Booking } from 'src/app/models/booking';
import { Matter } from 'src/app/models/matter';
import { ReservationService } from 'src/app/reservation/services/reservation.service';
import { ProfessorDetailsComponent } from '../professor-details/professor-details.component';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-view-all-reservations',
  templateUrl: './view-all-reservations.component.html',
  styleUrls: ['./view-all-reservations.component.scss']
})
export class ViewAllReservationsComponent implements OnInit {
  public startDate: NgbDate;
  public bookings: Booking[] = [];
  public search = "";
  @ViewChild('searchRef', { static: true }) searchRef: ElementRef;

  constructor(private userService: UserService,
    private router: Router,
    private reservationService: ReservationService) { }

  ngOnInit(): void {
    var date = new Date();
    this.startDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getUTCDate());
    this.seeBookings(this.search);    
    fromEvent(this.searchRef.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(500)
    ).subscribe(text => {
      this.seeBookings(text);
    });
  }

  seeBookings(search) {    
    this.search = search;
    let dateOfBooking = new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day).toDateString();
    this.reservationService.listBookings(this.search,dateOfBooking).subscribe(bookings => {
      this.bookings = bookings;
    });
  }
}

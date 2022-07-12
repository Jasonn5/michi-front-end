import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/authentication/models/user';
import { UserService } from 'src/app/authentication/services/user.service';
import { Booking } from 'src/app/models/booking';
import { Matter } from 'src/app/models/matter';
import { ReservationService } from 'src/app/reservation/services/reservation.service';
import { ProfessorDetailsComponent } from '../professor-details/professor-details.component';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-view-reservations-by-admin',
  templateUrl: './view-reservations-by-admin.component.html',
  styleUrls: ['./view-reservations-by-admin.component.scss']
})
export class ViewReservationsByAdminComponent implements OnInit {
  public professors: User[] = [];
  public professor: User;
  public bookings: Booking[] = [];
  public isPartOne = true;
  public modalOptions: NgbModalOptions;
  public search = "";
  public display = ""
  @ViewChild('searchRef', { static: true }) searchRef: ElementRef;

  constructor(private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.list(this.search);
    
    fromEvent(this.searchRef.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(500)
    ).subscribe(text => {
      this.list(text);
    });  

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'xl',
      centered: true
    }
  }

  list(search) {
    this.search = search;    
    this.userService.listUsers(this.search).subscribe(professors => {
      this.professors = professors;
    });

  }

  seeBookings(professor) {
    this.professor = professor;
    this.reservationService.listBookingById(professor.id).subscribe(bookings => {
      this.bookings = bookings;
      this.isPartOne = false;
      this.display = "none"
    });
  }

  seeMore(professor) {
    this.reservationService.getMattersByProffesor(professor.id).subscribe(matters => {
      matters.forEach(matter=>{
        this.reservationService.listClassroomSchedule(matter.id).subscribe(classroomSchedules=>{
          matter.classroomSchedules = classroomSchedules;
        });
      });
      const modalRef = this.modalService.open(ProfessorDetailsComponent, this.modalOptions);
      modalRef.componentInstance.data = {
        professor: professor,
        matters: matters
      };
    });
  }

  back() {
    this.isPartOne = true;
    this.display = ""
  }


}

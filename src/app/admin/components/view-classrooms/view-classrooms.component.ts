import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClassRoom } from 'src/app/models/classsroom';
import { ReservationService } from 'src/app/reservation/services/reservation.service';
import { ClassRoomPipe } from '../../pipes/classroom.pipe';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-view-classrooms',
  templateUrl: './view-classrooms.component.html',
  styleUrls: ['./view-classrooms.component.scss']
})
export class ViewClassroomsComponent implements OnInit {
  public classrooms: ClassRoom[] = [];
  public search = "";
  public active = true;
  public textButton = "Activo"
  @ViewChild('searchRef', { static: true }) searchRef: ElementRef;

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private classroomType: ClassRoomPipe,) { }

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
  }

  list(search) {
    this.search = search;
    this.reservationService.listClassrooms(this.search, this.active).subscribe(classrooms => {
      this.classrooms = classrooms;
    });

  }

  listActives(){
    this.active = !this.active
    this.textButton = this.active ? "Activos" : "Inactivos";
    this.list(this.search);
  }

  edit(classroom) {
    this.router.navigate(['/edit-classroom', classroom.id]);
  }

  addClassroom(){
    this.router.navigate(['/add-classroom']);
  }

  orderByCapacity(orderByMajor) {
    if (orderByMajor) {
      this.list(this.search);
    } else {
      this.classrooms = this.classrooms.sort((a, b) => a.capacity - b.capacity);
    }
  }
}

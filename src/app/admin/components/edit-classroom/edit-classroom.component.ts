import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { ClassRoom } from 'src/app/models/classsroom';
import { ReservationService } from 'src/app/reservation/services/reservation.service';

@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.scss']
})
export class EditClassroomComponent implements OnInit {
  public classRoom: ClassRoom = new ClassRoom();

  constructor(
    private route: ActivatedRoute, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reservationService.findClassroomById(params['id']).subscribe(classRoom => {
        this.classRoom = classRoom;
       });
    });
  }

  saveChanges(){
    this.reservationService.updateClassroom(this.classRoom).subscribe(()=>{
      alert("Cambios Guardados Exitosamente");
    });
  }

}

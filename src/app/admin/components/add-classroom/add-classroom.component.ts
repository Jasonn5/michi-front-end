import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassRoom } from 'src/app/models/classsroom';
import { ReservationService } from 'src/app/reservation/services/reservation.service';

@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.scss']
})
export class AddClassroomComponent implements OnInit {
  public classRoom: ClassRoom = new ClassRoom();

  constructor(
    private route: ActivatedRoute, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.classRoom.type = 1;
  }

  saveChanges() {
    if (this.classRoom.name != "") {
      if (this.classRoom.capacity > 1) {
        this.classRoom.isEnabled = true;
        this.reservationService.addClassroom(this.classRoom).subscribe(() => {
          alert("Ambiente registrado correctamente");
          location.reload();
        },error=>{
          alert(error.error.error.message);
          location.reload();
        });
      }else{
        alert("La capacidad debe ser mayor a 1");
      }
    } else {
      alert("El nombre es requerido");
    }
  }
}

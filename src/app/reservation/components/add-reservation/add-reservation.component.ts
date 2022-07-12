import { Component, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CustomizeService } from 'src/app/admin/services/customize.service';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { ClassRoom } from 'src/app/models/classsroom';
import { Customize } from 'src/app/models/customize';
import { Matter } from 'src/app/models/matter';
import { ReservationService } from '../../services/reservation.service';
import { UserService } from 'src/app/authentication/services/user.service';
import { User } from 'src/app/authentication/models/user';
import { throwError } from 'rxjs';
import { ClassroomSchedule } from 'src/app/models/classroomSchedule';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {
  public startDate: NgbDate;
  public user = '';
  public proffesors: User[] = [];
  public matters: Matter[] = [];
  public classroomSchedule: ClassroomSchedule[] = [];
  public matterSelected: Matter;
  public myClassroom: ClassRoom = new ClassRoom();
  public mattersSelected: Matter[] = [];
  public classrooms: ClassRoom[] = [];
  public classromSelected: ClassRoom = new ClassRoom();
  public normalClassRooms: ClassRoom[] = [];
  public laboratories: ClassRoom[] = [];
  public auditoriums: ClassRoom[] = [];
  public classRoomsSelected: ClassRoom[] = [];
  public laboratoriesSelected: ClassRoom[] = [];
  public auditoriumsSelected: ClassRoom[] = [];
  public classroomsToSave: ClassRoom[] = [];
  public isRequestClassroom = false;
  public totalCapacity = 0;
  public startHour = 0.0;
  public endHour = 0.0;
  public classroomCapacity = 0;
  public reserveLimit = "";
  public minimun = 0;
  public maximum = 0;
  public customize: Customize = null;
  public isUrgent = false;
  public isShare = false;
  public proffesorSelected: User;
  public isPartOne = true;
  public isMatterSelected = false;
  public capacityRequired = 0;
  public reason = "";
  public period = 1;
  public isClassDate = false;
  public isClassAvailable = false;

  constructor(private authService: AuthService,
    private reservationService: ReservationService,
    private customizeService: CustomizeService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.authService.getUsername();
    this.userService.findById(this.authService.getUserId()).subscribe(proffesor => {
      this.proffesorSelected = proffesor;
      this.listMatters(this.proffesorSelected.id);
      //this.listProffesors();
    });
    var date = new Date();  

    this.customizeService.findActualCustom().subscribe(customize => {
      this.customize = customize;
      this.minimun = this.customize.minimum;
      this.maximum = this.customize.maximum;
      this.startDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getUTCDate() + this.minimun);
      this.selectPriority("1");
    });
  }

  private listMatters(proffesorId) {
    this.reservationService.getMattersByProffesor(proffesorId).subscribe(matters => {
      this.matters = matters;
      this.selectMatter(this.matters[this.matters.length - 1].id);
    });
  }

  selectMatter(matter) {
    this.matterSelected = this.matters.find(m => m.id == parseInt(matter));
    this.capacityRequired = this.matterSelected.numberStudents;
    this.isMatterSelected = true;
    this.reservationService.listClassroomSchedule(matter).subscribe(classroomSchedule =>{
      this.classroomSchedule = classroomSchedule;
      this.selectDate(classroomSchedule);
    });
  }

  // selectProffersor(proffesorId) {
  //   this.listMatters(proffesorId);
  // }

  selectPriority(value) {
    var date = new Date();
    if (value == "1") {
      this.reserveLimit = "Podra reservar como minimo dentro de " + this.minimun + " dias y maximo: " + this.maximum + " dias";
      this.isUrgent = false;
      this.startDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getUTCDate() + this.minimun);
    } else {
      this.reserveLimit = "Podra reservar un ambiente dentro de las proximas 24hrs.";
      this.startDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getUTCDate() + 1);
      this.isUrgent = true;
    }
  }

  selectPeriod(value) {
    this.period = parseInt(value);
  }

  // isShared(value) {
  //   if (value == "1") {
  //     this.isShare = false;
  //   } else {
  //     this.isShare = true;
  //   }
  // }


  next() {
    if(this.startHour == 20.15 && this.period ==2){
      alert("La hora de finalizacion no puede ser mayor a las 21:45")
    }else{      
    var date = new Date().getTime();
    let startDate = new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day).getTime();
    var diference = startDate - date;
    var diferenceDay = diference / (1000 * 60 * 60 * 24);
    console.log(diferenceDay);
    if ((diferenceDay >= this.minimun) && (this.maximum >= diferenceDay)) {
      this.isPartOne = false;
      this.listAvailableClassrooms();
    } else {
      if (this.isUrgent) {
        this.listAvailableClassrooms();
        this.isPartOne = false;
      } else {
        alert("Debe escoger una fecha dentro del rango establecido");
      }
    }
    }
  }  

  listAvailableClassrooms(){    
    let startDate = new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day).toDateString();
    this.reservationService.getAvailableClassrooms(parseFloat(this.startHour.toString()), parseFloat(this.endHour.toString()), startDate, this.capacityRequired).subscribe(classrooms => {
      this.classrooms = classrooms;
      this.classrooms = this.classrooms.sort((a, b) => a.capacity - b.capacity);      
      var isFourClassroom = 4;
      var isFourLaboratory = 4;
      var isFourAuditory = 4;
      this.classrooms.forEach(classroom => {
        if (classroom.type == 1 && isFourClassroom> 0) {
          this.normalClassRooms.push(classroom);
          isFourClassroom--;
        }
        if (classroom.type == 2 && isFourLaboratory>0) {
          this.laboratories.push(classroom);
          isFourLaboratory--;
        }
        if (classroom.type == 3 && isFourAuditory > 0) {
          this.auditoriums.push(classroom);
          isFourAuditory--;
        }
      });
    });
  }

  after() {
    this.isPartOne = true;
    location.reload();
  }

 

  classroomSelected(classroom: ClassRoom) {
    if (this.capacityRequired >= classroom.capacity) {
      alert("La capcidad actual es menor a la requerida");
    } else {
      this.totalCapacity = this.classromSelected.capacity;
      this.classromSelected = classroom;
    }

  }

  bookClassroom() {
    if (this.capacityRequired >= this.totalCapacity) {
      alert("La capcidad actual es menor a la requerida");
    } else {
      this.matterSelected.user = this.proffesorSelected;
      let startDate = new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day);
      this.reservationService.addBooking(
        this.matterSelected, startDate, this.startHour, this.endHour, this.classromSelected, this.reason).subscribe(() => {
          alert("Reserva Guardada Correctamente");
          location.reload();
        })
      //this.classroomsToSave = this.classRoomsSelected.concat(this.laboratoriesSelected.concat(this.auditoriumsSelected))
    }
  }

  selectDate(value){    
    let dateOfBooking = new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day).toDateString();
    let startDate = new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day).getDay()
    if(startDate != 0){
      var schedules = this.classroomSchedule.find(s => s.day == startDate);   
      if(schedules){
        this.startHour = schedules.startHour;
        this.selectHour(this.startHour);
        this.isClassDate = true;
        this.reservationService.getAvailableClassroom(parseFloat(this.startHour.toString()), parseFloat(this.endHour.toString()), dateOfBooking, schedules.classRoom.id).subscribe(classroom =>{
          this.reservationService.findClassroomById(schedules.classRoom.id).subscribe(classroom => {
            this.myClassroom = classroom;
            this.isClassAvailable = true;
          });
        });
      }else{
        this.isClassDate = false;
      }
    }else{
      alert("No se puede reservar en Domingo");
      var date = new Date();        
      this.startDate = new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getUTCDate() + this.minimun);
      this.selectHour('6.45');
    }
  }

  selectHour(value) {
    value = parseFloat(value);
    var result = (value % 1).toFixed(2);
    if (this.period == 1) {
      if (parseFloat(result) == 0.15) {
        this.startHour = value;
        this.endHour = (value + 1.30).toFixed(2);
      } else {
        this.startHour = value;
        this.endHour = (value + 1.70).toFixed(2);
      }
    } else {
      this.startHour = value;
      this.endHour = (value + 3).toFixed(2);
    }
  }

}

 // addClassroom(classroom: ClassRoom) {
  //   this.totalCapacity = classroom.capacity + this.totalCapacity;
  //   var addClassRoom = this.normalClassRooms.find(c => c.id == classroom.id);
  //   var index = this.normalClassRooms.indexOf(addClassRoom);
  //   this.normalClassRooms.splice(index, 1);
  //   this.classRoomsSelected.push(addClassRoom);
  // }

  // removeClassroom(classroom: ClassRoom) {
  //   this.totalCapacity = this.totalCapacity - classroom.capacity;
  //   var removeClassRoom = this.classRoomsSelected.find(c => c.id == classroom.id);
  //   var index = this.classRoomsSelected.indexOf(removeClassRoom);
  //   this.classRoomsSelected.splice(index, 1);
  //   this.normalClassRooms.push(removeClassRoom);
  // }


  // addLaboratory(classroom: ClassRoom) {
  //   this.totalCapacity = classroom.capacity + this.totalCapacity;
  //   var addClassRoom = this.laboratories.find(c => c.id == classroom.id);
  //   var index = this.laboratories.indexOf(addClassRoom);
  //   this.laboratories.splice(index, 1);
  //   this.laboratoriesSelected.push(addClassRoom);
  // }

  // removeLaboratory(classroom: ClassRoom) {
  //   this.totalCapacity = this.totalCapacity - classroom.capacity;
  //   var removeClassRoom = this.laboratoriesSelected.find(c => c.id == classroom.id);
  //   var index = this.laboratoriesSelected.indexOf(removeClassRoom);
  //   this.laboratoriesSelected.splice(index, 1);
  //   this.laboratories.push(removeClassRoom);
  // }


  // addAuditory(classroom: ClassRoom) {
  //   this.totalCapacity = classroom.capacity + this.totalCapacity;
  //   var addClassRoom = this.auditoriums.find(c => c.id == classroom.id);
  //   var index = this.auditoriums.indexOf(addClassRoom);
  //   this.auditoriums.splice(index, 1);
  //   this.auditoriumsSelected.push(addClassRoom);
  // }

  // removeAuditory(classroom: ClassRoom) {
  //   this.totalCapacity = this.totalCapacity - classroom.capacity;
  //   var removeClassRoom = this.auditoriumsSelected.find(c => c.id == classroom.id);
  //   var index = this.auditoriumsSelected.indexOf(removeClassRoom);
  //   this.auditoriumsSelected.splice(index, 1);
  //   this.auditoriums.push(removeClassRoom);
  // }

  // addMatter(matter: Matter) {
  //   var addMatter = this.matters.find(m => m.id == matter.id);
  //   var index = this.matters.indexOf(addMatter);

  //   if (index > -1) {
  //     this.matters.splice(index, 1);
  //     this.mattersSelected.push(addMatter);
  //   }
  // }

  // removeMatterSelected(matter: Matter) {
  //   var removeMatter = this.mattersSelected.find(m => m.id == matter.id);
  //   var index = this.matters.indexOf(removeMatter);

  //   this.mattersSelected.splice(index, 1);
  //   this.matters.push(removeMatter);

  // }

  
  // deleteMatter(matterSelected: Matter) {
  //   var matter = this.mattersSelected.find(m => m.id == matterSelected.id);
  //   var index = this.mattersSelected.indexOf(matter);
  //   this.mattersSelected.splice(index, 1);
  //   this.matters.push(matter);
  // }

  

  // private listProffesors() {
  //   this.userService.listUsers().subscribe(proffesors => {
  //     this.proffesors = proffesors;
  //   });
  // }

  // selectMatter(value) {
  //   var matter = this.matters.find(m => m.id == parseInt(value));
  //   var index = this.matters.indexOf(matter);
  //   this.matters.splice(index, 1);
  //   this.mattersSelected.push(matter)
  // }
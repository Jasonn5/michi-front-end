import { Injectable } from '@angular/core';
import { Booking } from 'src/app/models/booking';
import { ReservationDatastoreService } from './reservation-datastore.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private reservationDatastoreService: ReservationDatastoreService) { }

  getAvailableClassrooms(startTime, endTime, date, capacity) {
    return this.reservationDatastoreService.getAvailableClassrooms(startTime, endTime, date, capacity);
  }

  getAvailableClassroom(startTime, endTime, date, classroomId) {
    return this.reservationDatastoreService.getAvailableClassroom(startTime, endTime, date, classroomId);
  }

  listClassrooms(search, active) {
    return this.reservationDatastoreService.listClassrooms(search, active);
  }

  findClassroomById(id){
    return this.reservationDatastoreService.findClassroomById(id);
  }
  
  updateClassroom(classRoom){
    return this.reservationDatastoreService.updateClassroom(classRoom);
  }

  addClassroom(classRoom){
    return this.reservationDatastoreService.addClassroom(classRoom);
  }

  getMattersByProffesor(proffesorId) {
    return this.reservationDatastoreService.getMattersByProffesor(proffesorId);
  }

  addBooking(matter, date, startTime, endTime, classroom, reason) {
    var newBooking = new Booking();
    newBooking.matter = matter;
    newBooking.date = date;
    newBooking.startTime = startTime;
    newBooking.endTime = endTime;
    newBooking.classroom = classroom;
    newBooking.reason = reason;

    return this.reservationDatastoreService.addBooking(newBooking);
  }

  listBookingById(bookingId){
    return this.reservationDatastoreService.listBookingById(bookingId);
  }

  listBookings(search, date){
    return this.reservationDatastoreService.listBookings(search, date);
  }

  listClassroomSchedule(matterId){
    return this.reservationDatastoreService.listClassroomSchedule(matterId);
  }
}

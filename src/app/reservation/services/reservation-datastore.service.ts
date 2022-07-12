import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from 'src/app/models/booking';
import { ClassroomSchedule } from 'src/app/models/classroomSchedule';
import { ClassRoom } from 'src/app/models/classsroom';
import { Matter } from 'src/app/models/matter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationDatastoreService {

  readonly ROOT_URL = `${environment.BACK_END_HOST}`;

  constructor(private http: HttpClient) { }

  getAvailableClassrooms(startTime, endTime, date, capacity) {
    return this.http.get<ClassRoom[]>(this.ROOT_URL + 'websis/available-classrooms?starttime=' + startTime + '&&endtime=' + endTime + '&&date=' + date + '&&capacity=' + capacity);
  }

  getAvailableClassroom(startTime, endTime, date, classroomId) {
    return this.http.get<ClassRoom>(this.ROOT_URL + 'websis/available-classroom?starttime=' + startTime + '&&endtime=' + endTime + '&&date=' + date + '&&id=' + classroomId);
  }

  getMattersByProffesor(proffersorId) {
    return this.http.get<Matter[]>(this.ROOT_URL + 'websis/matter/' + proffersorId);
  }

  addBooking(booking: Booking) {
    return this.http.post<Booking>(this.ROOT_URL + 'booking', booking);
  }

  listBookingById(bookingId) {
    return this.http.get<Booking[]>(this.ROOT_URL + 'booking/' + bookingId);
  }

  listBookings(search, date) {
    return this.http.get<Booking[]>(this.ROOT_URL + 'booking?search=' + search + '&&date=' + date);
  }

  listClassrooms(search, active) {
    return this.http.get<ClassRoom[]>(this.ROOT_URL + 'websis/classrooms?search=' + search + '&&active=' + active);
  }

  findClassroomById(id) {
    return this.http.get<ClassRoom>(this.ROOT_URL + 'websis/classrooms/' + id);
  }

  addClassroom(classRoom: ClassRoom) {
    return this.http.post<ClassRoom>(this.ROOT_URL + 'websis/classrooms', classRoom);
  }

  updateClassroom(classRoom: ClassRoom) {
    return this.http.patch<ClassRoom>(this.ROOT_URL + 'websis/classroom/' + classRoom.id, classRoom);
  }

  listClassroomSchedule(matterId) {
    return this.http.get<ClassroomSchedule[]>(this.ROOT_URL + 'websis/classroom-schedules/' + matterId);
  }
}

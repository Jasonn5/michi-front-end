import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomizeComponent } from './components/add-customize/add-customize.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewCustomizesComponent } from './components/view-customizes/view-customizes.component';
import { ViewClassroomsComponent } from './components/view-classrooms/view-classrooms.component';
import { EditClassroomComponent } from './components/edit-classroom/edit-classroom.component';
import { ViewReservationsByAdminComponent } from './components/view-reservations-by-admin/view-reservations-by-admin.component';
import { ClassRoomPipe } from './pipes/classroom.pipe';
import { ProfessorDetailsComponent } from './components/professor-details/professor-details.component';
import { AddClassroomComponent } from './components/add-classroom/add-classroom.component';
import { SchedulePipe } from './pipes/schedule.pipe';
import { ViewAllReservationsComponent } from './components/view-all-reservations/view-all-reservations.component';



@NgModule({
  declarations: [AddCustomizeComponent, ViewCustomizesComponent, ViewClassroomsComponent, EditClassroomComponent, ViewReservationsByAdminComponent,ClassRoomPipe,SchedulePipe, ProfessorDetailsComponent, AddClassroomComponent, ViewAllReservationsComponent],
  imports: [
    CommonModule,
    SidebarModule,    
    BrowserModule,
    FormsModule,
    NgbModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ClassRoomPipe,SchedulePipe],
  exports:[ClassRoomPipe,SchedulePipe],
})
export class AdminModule { }

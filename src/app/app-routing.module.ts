import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClassroomComponent } from './admin/components/add-classroom/add-classroom.component';
import { AddCustomizeComponent } from './admin/components/add-customize/add-customize.component';
import { EditClassroomComponent } from './admin/components/edit-classroom/edit-classroom.component';
import { ViewAllReservationsComponent } from './admin/components/view-all-reservations/view-all-reservations.component';
import { ViewClassroomsComponent } from './admin/components/view-classrooms/view-classrooms.component';
import { ViewCustomizesComponent } from './admin/components/view-customizes/view-customizes.component';
import { ViewReservationsByAdminComponent } from './admin/components/view-reservations-by-admin/view-reservations-by-admin.component';
import { LoginComponent } from './authentication/components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddReservationComponent } from './reservation/components/add-reservation/add-reservation.component';
import { ViewReservationsComponent } from './reservation/components/view-reservations/view-reservations.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'menu',component: MenuComponent},
  {path: 'add-reservation', component: AddReservationComponent},
  {path: 'view-reservations', component: ViewReservationsComponent},
  {path: 'customize', component: AddCustomizeComponent},
  {path: 'view-customizes', component: ViewCustomizesComponent},
  {path: 'view-classrooms', component: ViewClassroomsComponent},
  {path: 'edit-classroom/:id', component: EditClassroomComponent},
  {path: 'view-reservations-by-admin', component: ViewReservationsByAdminComponent},
  {path: 'view-all-reservation', component: ViewAllReservationsComponent},
  {path: 'add-classroom', component: AddClassroomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

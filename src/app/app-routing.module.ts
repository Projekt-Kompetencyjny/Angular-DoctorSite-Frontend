import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/doctor-main-component/home.component';
import { AuthGuard } from 'src/app/helpers/auth.guard';

const accountModule = () => import('src/app/doctor-forms-component/account.module').then(x => x.AccountModule);
const doctorModule = () => import('src/app/doctor-main-component/doctor.module').then(x => x.DoctorModule);
const calendarModule = () => import('src/app/doctor-calendar-component/calendar.module').then(x => x.ReservationsModule);
const visitlistModule = () => import('src/app/doctor-visit-component/visit.module').then(x => x.VisitListModule);
const patientsModule = () => import('src/app/doctor-patients-component/patients.module').then(x => x.PatientsModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'profile', loadChildren: doctorModule, canActivate: [AuthGuard] },
    { path: 'calendar', loadChildren: calendarModule, canActivate: [AuthGuard] },
    { path: 'visitation', loadChildren: visitlistModule, canActivate: [AuthGuard] },
    { path: 'patients', loadChildren: patientsModule, canActivate: [AuthGuard]},
    { path: 'account', loadChildren: accountModule },
    

    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
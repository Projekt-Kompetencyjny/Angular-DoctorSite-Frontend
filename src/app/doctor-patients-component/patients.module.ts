import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../doctor-patients-component/layout.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PatientsRoutingModule
    ],
    declarations: [
        LayoutComponent,
        PatientsComponent
    ]
})
export class PatientsModule { }
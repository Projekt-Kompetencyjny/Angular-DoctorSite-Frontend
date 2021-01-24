import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { LayoutComponent } from './layout.component';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DoctorRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ProfileComponent,
        ProfileEditComponent
    ]
})
export class DoctorModule { }
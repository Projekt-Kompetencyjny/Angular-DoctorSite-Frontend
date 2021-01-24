import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { DemoMaterialModule } from './calendar-material';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { VisitComponent } from './visit.component';
import { CreateLinkComponent } from './create-link.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarRoutingModule,
        DemoMaterialModule
    ],
    declarations: [
        LayoutComponent,
        CalendarComponent,
        VisitComponent,
        CreateLinkComponent
    ],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill'}},
        { provide: MAT_DATE_LOCALE, useValue: 'pl-PL'}
    ]
})
export class ReservationsModule { }
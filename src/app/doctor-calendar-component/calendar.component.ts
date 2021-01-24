import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, Doctor } from '../doctor-forms-component';
import { Reservation } from './reservation';

@Component({
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit{ 
    form: FormGroup;
    doctor: Doctor;
    minDate: Date;
    maxDate: Date;
    reservations: Reservation[];

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
    ) { this.doctor = this.accountService.doctorValue; 
        const currentDate = new Date()
        this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
        this.maxDate = new Date(currentDate.getFullYear() + 5, 11, 31)
    }

    myFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();
        return day !== 0 && day !== 6;
    }

    ngOnInit(){
        this.accountService.getReservations(this.doctor.doctorId, localStorage.getItem('Date'))
            .pipe(first())
            .subscribe(Reservations => this.reservations = Reservations)

        this.reactiveForm()
        localStorage.setItem('Date', '');
    }

    reactiveForm() {
        this.form = this.formBuilder.group({
            reservationDate: ['', [Validators.required]]
        })
    }

    date(e) {
        var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
        this.form.get('reservationDate').setValue(convertDate, {
          onlyself: true
        })
    }

    checkReservation() {
        localStorage.setItem('Date', this.form.controls.reservationDate.value);
        window.location.reload();
    }
}
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService, Doctor } from '../doctor-forms-component';
import { Patient } from './patient';

@Component({
    templateUrl: './patients.component.html',
    styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit{
    doctor: Doctor;
    patients: Patient[];

    constructor(private accountService: AccountService) {
        this.doctor = this.accountService.doctorValue;
    }

    ngOnInit(){
        this.accountService.getPatients(this.doctor.doctorId)
            .pipe(first())
            .subscribe(patients => this.patients = patients)
    }
 }

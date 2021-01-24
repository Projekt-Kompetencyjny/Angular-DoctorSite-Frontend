import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService, Doctor } from '../doctor-forms-component';
import { Visit } from './visit';

@Component({
    templateUrl: './visit-list.component.html',
    styleUrls: ['./visit-list.component.css'],
})
export class VisitListComponent implements OnInit{
    doctor: Doctor;
    visits: Visit[];

    constructor(private accountService: AccountService) {
        this.doctor = this.accountService.doctorValue;
    }
    
    ngOnInit(){
        this.accountService.getVisits(this.doctor.doctorId)
            .pipe(first())
            .subscribe(visits => this.visits = visits)
    }
 }

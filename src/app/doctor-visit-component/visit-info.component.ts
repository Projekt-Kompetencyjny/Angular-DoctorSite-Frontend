import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService, Doctor } from '../doctor-forms-component';
import { Visit } from './visit';

@Component({
    templateUrl: './visit-info.component.html',
    styleUrls: ['./visit-info.component.css'],
})
export class VisitInfoComponent implements OnInit{
    id: string;
    doctor: Doctor;
    visit: Visit;

    constructor(
        private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router,
    ) { this.doctor = this.accountService.doctorValue;
        this.id = this.route.snapshot.params['id']; }

    ngOnInit(){
        this.accountService.getVisit(this.id)
            .pipe(first())
            .subscribe(visit => this.visit = visit)
    }

    saveVisit() {
        localStorage.setItem('symptoms', this.visit.symptoms);
        localStorage.setItem('diagnosis', this.visit.diagnosis);
        localStorage.setItem('medicine', this.visit.prescribedMedications);
        localStorage.setItem('taking', this.visit.takingMedications);
        localStorage.setItem('recommendations', this.visit.recommendations);
    }
}


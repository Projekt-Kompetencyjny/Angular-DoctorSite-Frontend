import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert-component/alert.service';
import { AccountService, Doctor } from '../doctor-forms-component';
import { Reservation } from './reservation';
import { Visit } from './visit';

@Component({
    templateUrl: './visit.component.html',
    styleUrls: ['./visit.component.css']
})
export class VisitComponent implements OnInit {
    accept = false;
    form: FormGroup;
    id: String;
    doctor: Doctor;
    reservation: Reservation;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
    ) { this.doctor = this.accountService.doctorValue;
        this.id = this.route.snapshot.params['id'];
        this.accountService.getReservation(this.id)
            .pipe(first())
            .subscribe(Reservation => this.reservation = Reservation)
    }
    
    ngOnInit(){
        this.form = this.formBuilder.group({
            symptoms: [''],
            diagnosis: [''],
            medicine: [''],
            taking: [''],
            recommendations: ['']
        });
    }

    goto() {
        window.open("https://www.google.com", "_blank");
    }

    get f() { return this.form.controls; }

    onSubmitCheck() {
        if(this.accept == false) {
            this.accept = true;
        } 
        else this.accept = false;
    }

    onSubmitEnd() {
        this.alertService.clear();

        let visit = new Visit(this.reservation.reservationId, 
                                this.form.controls.symptoms.value,
                                this.form.controls.diagnosis.value,
                                this.form.controls.medicine.value,
                                this.form.controls.taking.value,
                                this.form.controls.recommendations.value);

        this.accountService.createVisit(visit)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.info('Wizyta została zapisana!', { keepAfterRouteChange: true });
                    this.accept = false;
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                }
            }
        );
    }
 }
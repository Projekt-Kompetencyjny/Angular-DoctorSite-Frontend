import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert-component/alert.service';
import { AccountService, Doctor } from '../doctor-forms-component';
import { linkUpdate } from './linkUpdate';
import { Reservation } from './reservation';

@Component({
    templateUrl: './create-link.component.html',
    styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent implements OnInit {
    doctor: Doctor;
    reservation: Reservation;
    form: FormGroup;
    id: String;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private route: ActivatedRoute,
        private alertService: AlertService,
    ) { this.doctor = this.accountService.doctorValue;
        this.id = this.route.snapshot.params['id'];
        this.accountService.getReservation(this.id)
            .pipe(first())
            .subscribe(Reservation => this.reservation = Reservation)
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            meetingLink: [''],
        });
    }

    get f() { return this.form.controls; }

    update() {
        let updateData = new linkUpdate(this.reservation.reservationId, this.form.controls.meetingLink.value)
        this.accountService.updateLink(updateData)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.info('Link został dodany!', { keepAfterRouteChange: true });
                },
                error: error => {
                    this.alertService.error(error);
                }
            }
        );
    }
}
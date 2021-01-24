import { Component } from '@angular/core';

import { Doctor } from 'src/app/doctor-forms-component/doctor';
import { AccountService } from 'src/app/doctor-forms-component/account.service';
import { AlertService } from '../alert-component/alert.service';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent { 
    doctor: Doctor;
    loading = false;
    submitted = false;
    accept = false;

    constructor(
        private accountService: AccountService,
        private alertService: AlertService
    ) { this.doctor = this.accountService.doctorValue; }

    onSubmitcheck() {
        if(this.accept == false) this.accept = true;
        else this.accept = false;
    }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();
        this.loading = true;

        this.accountService.delete(this.doctor.doctorId)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.info('Twoje Konto zostało usunięte', { keepAfterRouteChange: true });
                },
                error: error => {
                    this.accept = false;
                    this.alertService.error(error);
                    this.loading = false;
                }
            }
        );
    }
}
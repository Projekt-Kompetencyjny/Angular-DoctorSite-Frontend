import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService } from 'src/app/doctor-forms-component/account.service';
import { AlertService } from '../alert-component/alert.service';
import { Doctor } from '../doctor-forms-component';

@Component({
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent { 

    form: FormGroup;
    loading = false;
    submitted = false;
    accept = false;
    doctor: Doctor;

    states = ['dolnośląskie', 'kujawsko-pomorskie', 'lubelskie', 'lubuskie', 'łódzkie', 'małopolskie', 'mazowieckie', 'opolskie',
            'podkarpackie', 'podlaskie', 'pomorskie', 'śląskie', 'swiętokrzyskie', 'warmińsko-mazurskie', 'wielkopolskie', 'zachodniopomorskie'];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { this.doctor = this.accountService.doctorValue; }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            city: ['', Validators.required],
            street: ['', Validators.required],
            state: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required]
        });

        this.form.patchValue(this.doctor);
    }

    get f() { return this.form.controls; }

    onSubmitcheck() {
        if(this.accept == false) this.accept = true;
        else this.accept = false;
    }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.update(this.doctor.doctorId, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.info('Twoje dane zostały zmienione', { keepAfterRouteChange: true });
                    this.router.navigate(['../profile'], { relativeTo: this.route });
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
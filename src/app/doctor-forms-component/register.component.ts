import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from 'src/app/doctor-forms-component/account.service';
import { AlertService } from 'src/app/alert-component/alert.service';
import { DoctorRegister } from './doctor';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    doctorClass: DoctorRegister;

    states = ['', 'dolnośląskie', 'kujawsko-pomorskie', 'lubelskie', 'lubuskie', 'łódzkie', 'małopolskie', 'mazowieckie', 'opolskie',
            'podkarpackie', 'podlaskie', 'pomorskie', 'śląskie', 'świętokrzyskie', 'warmińsko-mazurskie', 'wielkopolskie', 'zachodniopomorskie'];

    specializations = ['' , 'Alergolog', 'Anestoziolog', 'Chirurg', 'Chirurg Plastyczny', 'Dermatolog','Epidemiolog', 'Hematolog', 'Ginekolog', 'Kardiolog', 'Neurochirurg', 'Okulista', 'Pediatra',
            'Psychiatra', 'Seksuolog', 'Stomatolog', 'Urolog']

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            pwz: ['', Validators.required],
            specialization: ['', Validators.required],
            pesel: ['', Validators.required],
            city: ['', Validators.required],
            street: ['', Validators.required],
            state: ['', Validators.required],
            phone: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            repeatpassword: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }

    onSubmit() {

        this.submitted = true;
        this.alertService.clear();

        if (this.form.invalid) {
            return;
        }
        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Rejestracja przeszła pomyślnie!!', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            }
        );
    }
}
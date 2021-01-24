import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert-component/alert.service';
import { AccountService, Doctor } from '../doctor-forms-component';
import { Visit } from './visit';
import { VisitUpdate } from './visitUpdate';

@Component({
    templateUrl: './visit-edit.component.html',
    styleUrls: ['./visit-edit.component.css'],
})
export class VisitEditComponent implements OnInit{
    accept = false;
    form: FormGroup;
    id: string;
    doctor: Doctor;
    visit: Visit;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
    ) { this.doctor = this.accountService.doctorValue;
        this.id = this.route.snapshot.params['id']; }

    ngOnInit(){ 
        this.form = this.formBuilder.group({
            symptoms: [''],
            diagnosis: [''],
            medicine: [''],
            taking: [''],
            recommendations: ['']
        });

        this.form.controls.symptoms.patchValue(localStorage.getItem('symptoms'));
        this.form.controls.diagnosis.patchValue(localStorage.getItem('diagnosis'));
        this.form.controls.medicine.patchValue(localStorage.getItem('medicine'));
        this.form.controls.taking.patchValue(localStorage.getItem('taking'));
        this.form.controls.recommendations.patchValue(localStorage.getItem('recommendations'));
    }

    onSubmitCheck() {
        if(this.accept == false) {
            this.accept = true;
        } 
        else this.accept = false;
    }

    onSubmitEnd() {
        let visit = new VisitUpdate( this.form.controls.symptoms.value,
            this.form.controls.diagnosis.value,
            this.form.controls.medicine.value,
            this.form.controls.taking.value,
            this.form.controls.recommendations.value);

        this.accountService.updateVisit(this.id, visit)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.info('Link został zapisany!', { keepAfterRouteChange: true });
                    this.accept = false;
                    localStorage.setItem('symptoms', visit.symptoms);
                    localStorage.setItem('diagnosis', visit.diagnosis);
                    localStorage.setItem('medicine', visit.prescribedMedications);
                    localStorage.setItem('taking', visit.takingMedications);
                    localStorage.setItem('recommendations', visit.recommendations);

                    this.router.navigate(['/visitation'], { relativeTo: this.route });
                },
                error: error => {
                    this.accept = false;
                    this.alertService.error(error);
                }
            }
        );
    }
}
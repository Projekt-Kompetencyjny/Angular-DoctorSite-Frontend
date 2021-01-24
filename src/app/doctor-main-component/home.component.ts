import { Component } from '@angular/core';

import { Doctor } from 'src/app/doctor-forms-component/doctor';
import { AccountService } from 'src/app/doctor-forms-component/account.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    doctor: Doctor;

    constructor(private accountService: AccountService) {
        this.doctor = this.accountService.doctorValue;
    }
}
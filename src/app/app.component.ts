import { Component } from '@angular/core';

import { AccountService } from 'src/app/doctor-forms-component/account.service';
import { Doctor } from 'src/app/doctor-forms-component/doctor';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    [x: string]: any;
    doctor: Doctor;

    constructor(private accountService: AccountService) {
        this.accountService.doctor.subscribe(x => this.doctor = x);
    }

    logout() {
        this.accountService.logout();
    }
}
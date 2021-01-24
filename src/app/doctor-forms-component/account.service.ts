import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Doctor, DoctorRegister } from 'src/app/doctor-forms-component/doctor';
import { Reservation } from '../doctor-calendar-component/reservation';
import { Visit } from '../doctor-visit-component/visit';
import { Patient } from '../doctor-patients-component/patient';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private doctorSubject: BehaviorSubject<Doctor>;
    public doctor: Observable<Doctor>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.doctorSubject = new BehaviorSubject<Doctor>(JSON.parse(localStorage.getItem('doctor')));
        this.doctor = this.doctorSubject.asObservable();
    }

    public get doctorValue(): Doctor {
        return this.doctorSubject.value;
    }

    login(email, password) {
        return this.http.post<Doctor>(`${environment.apiUrl}/doctor/login`, { email, password })
            .pipe(map(doctor => {
                localStorage.setItem('doctor', JSON.stringify(doctor));
                this.doctorSubject.next(doctor);
                return doctor;
            }));
    }

    logout() {
        localStorage.removeItem('doctor');
        this.doctorSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(doctor: DoctorRegister) {
        return this.http.post(`${environment.apiUrl}/doctor/register`, doctor);
    }

    getAll() {
        return this.http.get<Doctor[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<Doctor>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put<Doctor>(`${environment.apiUrl}/doctor/update/${id}`, params)
            .pipe(map(doctor => {
                const newDoctor = { ...this.doctorValue, ...params };
                localStorage.setItem('user', JSON.stringify(newDoctor));
                this.doctorSubject.next(newDoctor);
                return doctor;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/doctor/delete/${id}`)
            .pipe(map(x => {
                this.logout();
                return x;
            })
        );
    }

    getReservations(id, date) {
        let params = new HttpParams()
            .set('doctorId', id)
            .set('reservationDate', date);

        return this.http.get<Reservation[]>(`${environment.apiUrl}/reservation/get-list/doctor`, {params : params});
    }

    getReservation(id) {
        return this.http.get<Reservation>(`${environment.apiUrl}/reservation/get/${id}`);
    }

    createVisit(visitDate) {
        return this.http.post(`${environment.apiUrl}/doctor/visit/create`, visitDate);
    }

    getVisits(id: string) {
        return this.http.get<Visit[]>(`${environment.apiUrl}/doctor/visit/get-list/${id}`);
    }

    getVisit(id: string) {
        return this.http.get<Visit>(`${environment.apiUrl}/doctor/visit/get/${id}`)
    }

    updateVisit(id: string, visit) {
        return this.http.put(`${environment.apiUrl}/doctor/visit/update/${id}`, visit)
    }

    getPatients(id: string) {
        return this.http.get<Patient[]>(`${environment.apiUrl}/doctor/your-patients/${id}`)
    }

    updateLink(updateData) {
        return this.http.patch(`${environment.apiUrl}/reservation/update-link`, updateData)
    }
}
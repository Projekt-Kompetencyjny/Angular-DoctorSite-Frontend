import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../doctor-visit-component/layout.component';
import { VisitListRoutingModule } from './visit-routing.module';
import { VisitListComponent } from './visit-list.component';
import { VisitInfoComponent } from './visit-info.component';
import { VisitEditComponent } from './visit-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        VisitListRoutingModule
    ],
    declarations: [
        LayoutComponent,
        VisitListComponent,
        VisitInfoComponent,
        VisitEditComponent
    ]
})
export class VisitListModule { }
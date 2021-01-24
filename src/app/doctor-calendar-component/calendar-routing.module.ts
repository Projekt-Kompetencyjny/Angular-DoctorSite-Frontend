import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CalendarComponent } from './calendar.component';
import { VisitComponent } from './visit.component';
import { CreateLinkComponent } from './create-link.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: CalendarComponent },
            { path: 'create/:id', component: CreateLinkComponent },
            { path: 'visit/:id', component: VisitComponent }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalendarRoutingModule { }
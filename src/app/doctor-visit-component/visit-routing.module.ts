import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../doctor-patients-component/layout.component';
import { VisitEditComponent } from './visit-edit.component';
import { VisitInfoComponent } from './visit-info.component';
import { VisitListComponent } from './visit-list.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: VisitListComponent },
            { path: ':id', component: VisitInfoComponent },
            { path: 'edit/:id', component: VisitEditComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VisitListRoutingModule { }
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './login/login.component';
import {DepartmentListComponent} from './department-list/department-list.component';
import {DepartmentFormComponent} from './department-form/department-form.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeFormComponent} from './employee-form/employee-form.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectFormComponent} from './project-form/project-form.component';


const routes: Routes = [
    {path: 'department-list', component: DepartmentListComponent, canActivate: [AuthGuard]},
    {path: 'department-form', component: DepartmentFormComponent, canActivate: [AuthGuard]},
    {path: 'department-form/:id', component: DepartmentFormComponent, canActivate: [AuthGuard]},
    {path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard]},
    {path: 'employee-form', component: EmployeeFormComponent, canActivate: [AuthGuard]},
    {path: 'employee-form/:id', component: EmployeeFormComponent, canActivate: [AuthGuard]},
    {path: 'project-list', component: ProjectListComponent, canActivate: [AuthGuard]},
    {path: 'project-form', component: ProjectFormComponent, canActivate: [AuthGuard]},
    {path: 'project-form/:id', component: ProjectFormComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: 'employee-list', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

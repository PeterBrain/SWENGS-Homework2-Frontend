import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DateComponent} from './date/date.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {DepartmentFormComponent} from './department-form/department-form.component';
import {DepartmentListComponent} from './department-list/department-list.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeFormComponent} from './employee-form/employee-form.component';
import {ProjectFormComponent} from './project-form/project-form.component';
import {ProjectListComponent} from './project-list/project-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtModule} from '@auth0/angular-jwt';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent,
        EmployeeListComponent,
        EmployeeFormComponent,
        ProjectFormComponent,
        ProjectListComponent,
        DepartmentFormComponent,
        DepartmentListComponent,
        DateComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSliderModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatExpansionModule,
        MatIconModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:4200']
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

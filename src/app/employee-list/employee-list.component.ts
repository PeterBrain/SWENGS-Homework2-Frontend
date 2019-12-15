import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeService} from '../service/employee.service';
import {ProjectService} from '../service/project.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

    displayedColumns = ['first_name', 'last_name', 'dob', 'id'];
    employees: MatTableDataSource<any>; // any[];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private http: HttpClient, public employeeService: EmployeeService) {
    }

    ngOnInit() {
        /*this.http.get('/api/movie/list').subscribe((response: any[]) => {
          this.movies = response;
        });*/
        this.employeeService.getEmployees().subscribe((response: any[]) => {
            this.employees = new MatTableDataSource<any>(response); // = response;
            this.employees.paginator = this.paginator;
        });
    }

    deleteEmployee(employee: any) {
        this.employeeService.deleteEmployee(employee).subscribe(() => {
            this.ngOnInit();
        });
    }
}

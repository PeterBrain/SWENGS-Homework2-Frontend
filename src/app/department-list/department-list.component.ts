import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeService} from '../service/employee.service';
import {DepartmentService} from '../service/department.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-department-list',
    templateUrl: './department-list.component.html',
    styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {

    displayedColumns = ['name', 'description', 'id'];
    departments: MatTableDataSource<any>; // any[];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private http: HttpClient, public departmentService: DepartmentService) {
    }

    ngOnInit() {
        this.departmentService.getDepartments().subscribe((response: any[]) => {
            this.departments = new MatTableDataSource<any>(response); // = response;
            this.departments.paginator = this.paginator;
        });
    }

    deleteDepartment(department: any) {
        this.departmentService.deleteDepartment(department).subscribe(() => {
            this.ngOnInit();
        });
    }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeService} from '../service/employee.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

    displayedColumns = ['first_name', 'last_name', 'dob', 'department', 'id'];
    employees: MatTableDataSource<any>;

    chartData: any[];
    view: any[] = [700, 300];
    gradient: boolean = false;
    animations: boolean = true;
    colorScheme = {
        domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
    };

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private http: HttpClient, public employeeService: EmployeeService) {
    }

    ngOnInit() {
        this.employeeService.getEmployees().subscribe((response: any[]) => {
            this.employees = new MatTableDataSource<any>(response);
            this.employees.paginator = this.paginator;
        });

        this.employeeService.getEmployeeChartData().subscribe((response: any[]) => {
            const result = [];

            response.forEach(function(obj: string) {
                const entry = Object.values(obj)[0];
                result[entry] = (result[entry] || 0) + 1;
            });

            Object.entries(result).forEach((entry: any) => {
                result.push({name: entry[0], value: entry[1]});
            });

            this.chartData = result;
        });
    }

    deleteEmployee(employee: any) {
        this.employeeService.deleteEmployee(employee).subscribe(() => {
            this.ngOnInit();
        });
    }

    labelFormatting(c) {
        return `${(c.label)}`;
    }

    onSelect(event) {
        console.log(event);
    }
}

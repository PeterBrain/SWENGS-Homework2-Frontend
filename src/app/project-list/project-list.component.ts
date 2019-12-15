import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeService} from '../service/employee.service';
import {ProjectService} from '../service/project.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

    displayedColumns = ['name', 'description', 'id'];
    projects: MatTableDataSource<any>; // any[];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private http: HttpClient, private projectService: ProjectService) {
    }

    ngOnInit() {
        this.projectService.getProjects().subscribe((response: any[]) => {
            this.projects = new MatTableDataSource<any>(response); // = response;
            this.projects.paginator = this.paginator;
        });
    }

    deleteProject(project: any) {
        this.projectService.deleteProject(project).subscribe(() => {
            this.ngOnInit();
        });
    }

}

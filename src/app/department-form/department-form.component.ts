import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentService} from '../service/department.service';

@Component({
    selector: 'app-department-form',
    templateUrl: './department-form.component.html',
    styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {

    constructor(private fb: FormBuilder,
                private http: HttpClient,
                private route: ActivatedRoute,
                private router: Router,
                private departmentService: DepartmentService) {
    }

    departmentFormGroup;

    ngOnInit() {
        this.departmentFormGroup = this.fb.group({
            'id': [null],
            'name': ['', [Validators.required]],
            'description': [null],
        });

        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.http.get('/api/department/' + id + '/get').subscribe((response) => {
                this.departmentFormGroup.patchValue(response, {emitEvent: false});
            });
        }
    }

    createDepartment() {
        const department = this.departmentFormGroup.value;

        if (department.id) {
            this.departmentService.updateDepartment(department).subscribe(() => {
                this.ngOnInit();
            });
        } else {
            this.departmentService.createDepartment(department).subscribe(() => {
                this.router.navigate(['/department-list']);
            });
        }
    }

}

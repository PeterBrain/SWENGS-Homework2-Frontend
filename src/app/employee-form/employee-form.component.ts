import {Component, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../service/employee.service';
import {DepartmentService} from '../service/department.service';
import {ProjectService} from '../service/project.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

    constructor(private fb: FormBuilder,
                private http: HttpClient,
                private route: ActivatedRoute,
                private router: Router,
                private employeeService: EmployeeService,
                private departmentService: DepartmentService,
                private projectService: ProjectService) {
    }

    employeeFormGroup;
    age;
    departmentOptions;
    projectOptions;

    /*badWordValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const forbidden = /bad word/.test(control.value);
            return forbidden ? {badWord: {value: control.value}} : null;
        };
    }

    titleValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            return this.employeeService.getEmployees().pipe(
                map((employees: any[]) => {
                    const currentId = this.employeeFormGroup.controls.id.value;
                    const currentFirstName = this.employeeFormGroup.controls.first_name.value;

                    const employeeWithSameTitle = employees.find((m) => {
                        return m.id !== currentId && m.first_name === currentFirstName;
                    });

                    if (employeeWithSameTitle) {
                        return {
                            nameAlreadyExists: true
                        };
                    } else {
                        return null;
                    }
                })
            );
        };
    }*/

    ngOnInit() {
        this.employeeFormGroup = this.fb.group({
            'id': [null],
            'first_name': ['', [Validators.required, /*this.titleValidator()*/]],
            'last_name': [null],
            'dob': [null, Validators.required],
            /*'plot': ['', [Validators.required, this.badWordValidator()]],
            'duration': [90, Validators.max(300)],
            'black_and_white': [true],*/
            'department': [null],
            'projects': [[]],
        });

        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.http.get('/api/employee/' + id + '/get').subscribe((response) => {
                this.employeeFormGroup.patchValue(response, {emitEvent: false});
            });
        }

        this.employeeFormGroup.controls.dob.valueChanges.subscribe(() => {
            const dob = this.employeeFormGroup.controls.dob.value;
            this.age = undefined;
            if (dob) {
                this.age = this.calculateAge(new Date(dob));
            }
        });

        this.departmentService.retrieveDepartmentOptions().subscribe((result) => {
            this.departmentOptions = result;
        });

        this.projectService.retrieveProjectOptions().subscribe((result) => {
            this.projectOptions = result;
        });
    }

    createEmployee() {
        const employee = this.employeeFormGroup.value;

        if (employee.id) {
            this.employeeService.updateEmployee(employee).subscribe(() => {
                this.ngOnInit();
            });
        } else {
            this.employeeService.createEmployee(employee).subscribe(() => {
                this.router.navigate(['/employee-list']);
            });
        }
    }

    calculateAge(date) {
        const ageDivMs = Date.now() - date;

        if (ageDivMs > 0) {
            const ageDate = new Date(ageDivMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        } else {
            return 0;
        }
    }

}

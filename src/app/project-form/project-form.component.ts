import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../service/project.service';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

    constructor(private fb: FormBuilder,
                private http: HttpClient,
                private route: ActivatedRoute,
                private router: Router,
                private projectService: ProjectService) {
    }

    projectFormGroup;

    ngOnInit() {
        this.projectFormGroup = this.fb.group({
            'id': [null],
            'name': ['', [Validators.required, this.nameValidator()]],
            'description': [null],
            'start_date': [null, Validators.required],
            'end_date': [null],
            'progress': [0, Validators.max(100)],
            'finished': [false],
        });

        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.http.get('/api/project/' + id + '/get').subscribe((response) => {
                this.projectFormGroup.patchValue(response, {emitEvent: false});
            });
        }
    }

    createProject() {
        const project = this.projectFormGroup.value;

        if (project.id) {
            this.projectService.updateProject(project).subscribe(() => {
                this.ngOnInit();
            });
        } else {
            this.projectService.createProject(project).subscribe(() => {
                this.router.navigate(['/project-list']);
            });
        }
    }

    formatLabel(value: number) {
        if (value >= 1) {
            return value + '%';
        }

        return value;
    }

    nameValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const forbidden = ['project', 'test'];
            const exist = forbidden.some(word => control.value.toLowerCase().includes(word));
            return exist ? {nameContainsBadWords: {value: control.value}} : null;
        };
    }
}

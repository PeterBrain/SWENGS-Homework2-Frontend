import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {

    constructor(private http: HttpClient) {
    }

    getDepartments() {
        return this.http.get('/api/department/list');
    }

    createDepartment(department) {
        return this.http.post('/api/department/create', department);
    }

    updateDepartment(department) {
        return this.http.put('/api/department/' + department.id + '/update', department);
    }

    deleteDepartment(department) {
        return this.http.delete('/api/department/' + department.id + '/delete', department);
    }

    retrieveDepartmentOptions() {
        return this.http.get <any[]>('/api/department/options');
    }
}

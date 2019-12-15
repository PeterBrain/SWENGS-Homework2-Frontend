import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private http: HttpClient) {
    }

    getEmployees() {
        return this.http.get('/api/employee/list');
    }

    createEmployee(employee) {
        return this.http.post('/api/employee/create', employee);
    }

    updateEmployee(employee) {
        return this.http.put('/api/employee/' + employee.id + '/update', employee);
    }

    deleteEmployee(employee) {
        return this.http.delete('/api/employee/' + employee.id + '/delete', employee);
    }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) {
    }

    getProjects() {
        return this.http.get('/api/project/list');
    }

    createProject(project) {
        return this.http.post('/api/project/create', project);
    }

    updateProject(project) {
        return this.http.put('/api/project/' + project.id + '/update', project);
    }

    deleteProject(project) {
        return this.http.delete('/api/project/' + project.id + '/delete', project);
    }

    retrieveProjectOptions() {
        return this.http.get <any[]>('/api/project/options');
    }
}

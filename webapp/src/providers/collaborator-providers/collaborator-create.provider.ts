import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CollaboratorCreateProvider {
    constructor(private apiGateway: ApiGateway) { }

    ngOnInit(): void { }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.COLLABORATOR_MS + 'collaborators')
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findByName(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get(environment.COLLABORATOR_MS + `collaborators/find/name?${query}`)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findOne(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.COLLABORATOR_MS + 'collaborators/:id', { id: id })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    update(id: string | null, collaborator: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .put(environment.COLLABORATOR_MS + 'collaborators/:id', { id: id }, collaborator)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    store(collaborator: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .post(environment.COLLABORATOR_MS + 'collaborators', collaborator)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    destroy(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .delete(environment.COLLABORATOR_MS + 'collaborators/:id', { id: id })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }
}
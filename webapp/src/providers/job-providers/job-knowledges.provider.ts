import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class JobKnowledgeProvider {
    constructor(private apiGateway: ApiGateway) { }

    ngOnInit(): void { }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.JOBS_MS + 'knowledges')
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findOne(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.JOBS_MS + 'knowledges/:id', { id: id })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }


    findByJob(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.JOBS_MS + 'knowledges/job/:id', { id })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    update(id: string | null, knowledge: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .put(environment.JOBS_MS + 'knowledges/:id', { id: id }, knowledge)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    store(knowledge: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .post(environment.JOBS_MS + 'knowledges', knowledge)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    destroy(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .delete(environment.JOBS_MS + 'knowledges/:id', { id: id })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }
}

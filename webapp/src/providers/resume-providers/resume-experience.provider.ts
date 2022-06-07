import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ResumeExperienceProvider {
    constructor(private apiGateway: ApiGateway) { }

    ngOnInit(): void { }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.RESUME_MS + 'experiences')
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findByName(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get(environment.RESUME_MS + `experiences/find/name?${query}`)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findOne(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get(environment.RESUME_MS + 'experiences/:id', { id: id })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    update(id: string | null, experience: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .put(environment.RESUME_MS + 'experiences/:id', { id: id }, experience)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    store(experience: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .post(environment.RESUME_MS + 'experiences', experience)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    destroy(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .delete(environment.RESUME_MS + 'experiences/:id', { id: id })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }
}

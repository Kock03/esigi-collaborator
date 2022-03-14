import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TechnicalInterviewProvider {
    constructor(private apiGateway: ApiGateway) {
    }

    ngOnInit(): void {

    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get(environment.JOBS_MS + 'technical-interviews').subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    findOne(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get(environment.JOBS_MS + 'technical-interviews', { id: id }).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }


    update(id: string | null, technicalInterview: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.put(environment.JOBS_MS +'technical-interviews/:id', { id: id }, technicalInterview).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    store(id: string | null, technicalInterview: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post(environment.JOBS_MS + 'technical-interviews/:id', { id: id }, technicalInterview).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    };

    destroy(technicalInterview: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.delete(environment.JOBS_MS + 'technical-interview', technicalInterview).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        })
    }
}
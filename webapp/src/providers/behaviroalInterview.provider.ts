import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BehaviroalInterviewProvider {
    constructor(private apiGateway: ApiGateway) {
    }

    ngOnInit(): void {

    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get(environment.JOBS_MS + 'behaviroalInterviews').subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    findOne(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get(environment.JOBS_MS + 'behaviroalInterviews', { id: id }).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }


    update(behaviroalInterview: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.put(environment.JOBS_MS + 'behaviroalInterviews', behaviroalInterview).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    store(behaviroalInterview: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post(environment.JOBS_MS + 'behaviroalInterviews', behaviroalInterview).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    };

    destroy(BehaviroalInterview: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.delete(environment.JOBS_MS + 'BehaviroalInterviews', BehaviroalInterview).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        })
    }
}
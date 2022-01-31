import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class JobProvider {
    constructor(private apiGateway: ApiGateway){
    }

    ngOnInit(): void {

    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get(environment.JOBS_MS + 'jobs').subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }
 
    findOne(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get(environment.JOBS_MS +  'jobs', { id: id }).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }


    update(job: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.put(environment.JOBS_MS + 'jobs', job).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    store(job: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post(environment.JOBS_MS + 'jobs', job).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    };

    destroy(job: any): Promise<any> {
      return new Promise((resolve, reject) => {
          this.apiGateway.delete(environment.JOBS_MS + 'jobs', job).subscribe((response: HttpResponse<any>) => {
              resolve(response.body);
          }, reject);
      })
    }

}
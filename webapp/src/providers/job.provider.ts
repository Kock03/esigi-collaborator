import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";
import { Job } from "src/app/modules/job/job-list/job-list.component";
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
                console.log("🚀 ~ file: job.provider.ts ~ line 20 ~ JobProvider ~ this.apiGateway.get ~ response", response)
                const jobs: Job[] = response.body
                resolve(jobs);
            }, reject);
        });
    }
 
    findOne(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get(environment.JOBS_MS +  'jobs/:id', { id: id }).subscribe((response: HttpResponse<Job>) => {
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
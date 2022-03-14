import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobProvider {
  constructor(private apiGateway: ApiGateway) {}

  ngOnInit(): void {}

  findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.JOBS_MS + 'jobs')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findAllInterviews(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.JOBS_MS + 'jobs')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findOne(id: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.JOBS_MS + 'jobs/:id', { id: id })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  getFollowUpInterviews(id: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.JOBS_MS + 'interviews/follow-up-interviews/:id', {
          id: id,
        })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  update(id: string | null, job: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .put(environment.JOBS_MS + 'jobs/:id', { id: id }, job)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  store(job: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .post(environment.JOBS_MS + 'jobs', job)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  destroy(id: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .delete(environment.JOBS_MS + 'jobs/:id', { id: id })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }
}

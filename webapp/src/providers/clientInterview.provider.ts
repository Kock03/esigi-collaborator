import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientInterviewProvider {
  constructor(private apiGateway: ApiGateway) {}

  ngOnInit(): void {}

  findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.JOBS_MS + 'client-interviews')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findOne(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.JOBS_MS + 'client-interviews', { id: id })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  update(clientInterview: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .put(environment.JOBS_MS + 'client-interviews', clientInterview)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  store(clientInterview: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .post(environment.JOBS_MS + 'client-interviews', clientInterview)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  destroy(clientInterview: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .delete(environment.JOBS_MS + 'client-interviews', clientInterview)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }
}

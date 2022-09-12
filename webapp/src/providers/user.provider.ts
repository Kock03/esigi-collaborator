import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserProvider {
  constructor(private apiGateway: ApiGateway) {}

  ngOnInit(): void {}

  findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.AUTH_SERVICE_MS + 'users')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findOne(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.AUTH_SERVICE_MS + 'users', { id: id })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  update(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .put(environment.AUTH_SERVICE_MS + 'users', user)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  store(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .post(environment.AUTH_SERVICE_MS + 'users', user)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  destroy(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .delete(environment.AUTH_SERVICE_MS + 'users/' + id)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }
}

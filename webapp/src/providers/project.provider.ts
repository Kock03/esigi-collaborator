import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root',
})
export class ProjectProvider {
  constructor(private apiGateway: ApiGateway) { }

  ngOnInit(): void { }

  findByProject(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.PROJECT_MS + `projects/collaborator/?id=${id}`)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findByName(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        this.apiGateway.post(environment.PROJECT_MS + 'projects/find/name', data)
            .subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
    });
}


  find(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.PROJECT_MS +  'projects/find', body)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  
  findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.PROJECT_MS + 'projects')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

}
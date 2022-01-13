import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";

@Injectable({
    providedIn: 'root'
})
export class CollaboratorProvider {
    constructor(private apiGateway: ApiGateway){
    }

    ngOnInit(): void {

    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get('collaborators').subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    findOne(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get( 'collaborators', { id: id }).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }


    update(collaborator: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.put('collaborators', collaborator).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    store(collaborator: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post('collaborators', collaborator).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    };

    destroy(collaborator: any): Promise<any> {
      return new Promise((resolve, reject) => {
          this.apiGateway.delete('collaborators', collaborator).subscribe((response: HttpResponse<any>) => {
              resolve(response.body);
          }, reject);
      })
    }

}
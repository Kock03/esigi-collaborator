import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";

@Injectable({
    providedIn: 'root'
})
export class EducationProvider {
    constructor(private apiGateway: ApiGateway){
    }

    ngOnInit(): void {

    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get('educations').subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    findOne(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get( 'educations', { id: id }).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }


    update(education: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.put('educations', education).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    store(education: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post('educations', education).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    };

    destroy(education: any): Promise<any> {
      return new Promise((resolve, reject) => {
          this.apiGateway.delete('educations', education).subscribe((response: HttpResponse<any>) => {
              resolve(response.body);
          }, reject);
      })
    }

}
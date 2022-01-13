import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";

@Injectable({
    providedIn: 'root'
})
export class PhoneProvider {
    constructor(private apiGateway: ApiGateway){
    }

    ngOnInit(): void {

    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get('phones').subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    findOne(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get( 'phones', { id: id }).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }


    update(phone: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.put('phones', phone).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    store(phone: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post('phones', phone).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    };

    destroy(phone: any): Promise<any> {
      return new Promise((resolve, reject) => {
          this.apiGateway.delete('phones', phone).subscribe((response: HttpResponse<any>) => {
              resolve(response.body);
          }, reject);
      })
    }

}
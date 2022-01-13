import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";

@Injectable({
    providedIn: 'root'
})
export class AddressProvider {
    constructor(private apiGateway: ApiGateway){
    }

    ngOnInit(): void {

    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get('addresses').subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    findOne(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get( 'addresses', { id: id }).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }


    update(address: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.put('addresses', address).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    store(address: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post('addresses', address).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    };

    destroy(address: any): Promise<any> {
      return new Promise((resolve, reject) => {
          this.apiGateway.delete('addresses', address).subscribe((response: HttpResponse<any>) => {
              resolve(response.body);
          }, reject);
      })
    }

}
import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";

@Injectable({
    providedIn: 'root'
})
export class BankProvider {
    constructor(private apiGateway: ApiGateway){
    }

    ngOnInit(): void {

    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get('bank').subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    findOne(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get( 'bank', { id: id }).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }


    update(bank: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.put('bank', bank).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    store(bank: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post('bank', bank).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    };

    destroy(bank: any): Promise<any> {
      return new Promise((resolve, reject) => {
          this.apiGateway.delete('bank', bank).subscribe((response: HttpResponse<any>) => {
              resolve(response.body);
          }, reject);
      })
    }

}
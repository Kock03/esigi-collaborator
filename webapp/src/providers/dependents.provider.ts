import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DependentsProvider {
    constructor(private apiGateway: ApiGateway) {
    }

    ngOnInit(): void {

    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get(environment.COLLABORATOR_MS + 'dependents').subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    findOne(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.get(environment.COLLABORATOR_MS + 'dependents', { id: id }).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }


    update(Dependents: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.put(environment.COLLABORATOR_MS + 'dependents', Dependents).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    }

    store(Dependents: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post(environment.COLLABORATOR_MS + 'dependents', Dependents).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        });
    };

    destroy(Dependents: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.delete(environment.COLLABORATOR_MS + 'dependents', Dependents).subscribe((response: HttpResponse<any>) => {
                resolve(response.body);
            }, reject);
        })
    }
}
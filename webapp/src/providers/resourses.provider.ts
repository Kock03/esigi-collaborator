import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
  })
  export class ResourceProvider {
    constructor(private apiGateway: ApiGateway) {}
  
    ngOnInit(): void {}
  
    findByCollaborator(collaboratorId: string): Promise<any> {
      return new Promise((resolve, reject) => {
        this.apiGateway
          .get(environment.PROJECT_MS + 'resources/collaborator/?'+collaboratorId)
          .subscribe((response: HttpResponse<any>) => {
            resolve(response.body);
          }, reject);
      });
    }
}
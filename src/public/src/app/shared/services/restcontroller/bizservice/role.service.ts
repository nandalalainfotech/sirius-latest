import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Role001wb } from "../entities/Role001wb";


@Injectable()

export class RoleManager extends BaseService {

  private roleUrl: string = `${environment.apiUrl}/rolecontroller`

    allrole() {
        return this.getCallService(`${this.roleUrl}`+"/list");
      }
      
      saverole(role001wb:Role001wb) {
        return this.postCallService(`${this.roleUrl}`+"/create",{}, role001wb);
      }

      updaterole(role001wb:Role001wb) {
        return this.putCallService(`${this.roleUrl}`+"/update", {}, role001wb);
      }

      deleterole(_id: any) {
        let data: any = {};
        data['_id'] = _id;
        return this.deleteCallService(`${this.roleUrl}`+"/delete", data);
      }
}
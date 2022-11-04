import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Status001mb } from "../entities/Status001mb";

@Injectable()

export class StatusSettingManager extends BaseService {

    private statusUrl: string = `${environment.apiUrl}/statussettingcontroller`

    allstatus() {
        
        return this.getCallService(`${this.statusUrl}` + "/list");
    }

    savestatus(status001mb: Status001mb) {
        return this.postCallService(`${this.statusUrl}` + "/create", {}, status001mb);
    }

    updatestatus(status001mb: Status001mb) {
        return this.putCallService(`${this.statusUrl}` + "/update", {}, status001mb);
    }

    deletestatus(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.statusUrl}` + "/delete", data);
    }

}
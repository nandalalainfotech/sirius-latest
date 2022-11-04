import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Subscriptionmaster001mb } from "../entities/Subscriptionmaster001mb";


@Injectable()

export class SubscriptionmasterManager extends BaseService {

    private submasterUrl: string = `${environment.apiUrl}/subscriptionmastercontroller`

    allsubmaster() {
        return this.getCallService(`${this.submasterUrl}` + "/list");
    }

    savesub(subscriptionmaster001mb: Subscriptionmaster001mb) {
        return this.postCallService(`${this.submasterUrl}` + "/create", {}, subscriptionmaster001mb);
    }

    updatesub(subscriptionmaster001mb: Subscriptionmaster001mb) {
        return this.putCallService(`${this.submasterUrl}` + "/update", {}, subscriptionmaster001mb);
    }

    deletesub(id: any) {        
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.submasterUrl}` + "/delete", data);
    }

}
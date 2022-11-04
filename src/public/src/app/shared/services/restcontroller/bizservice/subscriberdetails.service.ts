import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Subscriberdetails001wb } from "../entities/subscriberdetails001wb";


@Injectable()

export class SubscriberdetailsManager extends BaseService {

    private subdetailsUrl: string = `${environment.apiUrl}/subscriberdetailscontroller`

    allsubdetails() {
        return this.getCallService(`${this.subdetailsUrl}` + "/list");
    }

    savesub(subscriberdetails001wb: Subscriberdetails001wb) {        
        return this.postCallService(`${this.subdetailsUrl}` + "/create", {}, subscriberdetails001wb);
    }

    updatesub(subscriberdetails001wb: Subscriberdetails001wb) {
        return this.putCallService(`${this.subdetailsUrl}` + "/update", {}, subscriberdetails001wb);
    }

    deletesub(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.subdetailsUrl}` + "/delete", data);
    }

}
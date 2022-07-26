import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Subcatclassification001mb } from "../entities/Subcatclassification001mb";

@Injectable()

export class SubCatClassificationManager extends BaseService {

    private subcatclasiUrl: string = `${environment.apiUrl}/subcatclassificationcontroller`

    allsubclasi() {
        return this.getCallService(`${this.subcatclasiUrl}` + "/list");
    }

    savesub(subcatclassification001mb: Subcatclassification001mb) {
        return this.postCallService(`${this.subcatclasiUrl}` + "/create", {}, subcatclassification001mb);
    }

    updatesubclasi(subcatclassification001mb: Subcatclassification001mb) {
        return this.putCallService(`${this.subcatclasiUrl}` + "/update", {}, subcatclassification001mb);
    }

    deletesub(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.subcatclasiUrl}` + "/delete", data);
    }

}
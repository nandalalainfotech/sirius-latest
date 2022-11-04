import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";


@Injectable()

export class ContentMasterManager extends BaseService {

    private contentMasterUrl: string = `${environment.apiUrl}/contentmastercontroller`

    allcontent() {
        return this.getCallService(`${this.contentMasterUrl}` + "/list");
    }
}
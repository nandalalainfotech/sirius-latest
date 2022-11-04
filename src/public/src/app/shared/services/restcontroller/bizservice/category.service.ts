import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Categorydetails001mb } from "../entities/Categorydetails001mb";
import { Subcategory001mb } from "../entities/Subcategory001mb";

@Injectable()

export class CategoryManager extends BaseService {

    private catUrl: string = `${environment.apiUrl}/categorydetailcontroller`

    allcatg() {
        return this.getCallService(`${this.catUrl}` + "/list");
    }

    savesub(categorydetails001mb: Categorydetails001mb) {
        return this.postCallService(`${this.catUrl}` + "/create", {}, categorydetails001mb);
    }

    updatecatg(categorydetails001mb: Categorydetails001mb) {
        return this.putCallService(`${this.catUrl}` + "/update", {}, categorydetails001mb);
    }

    deletecatg(_id: any) { 

        let data: any = {};
        data['_id'] = _id;
        return this.deleteCallService(`${this.catUrl}` + "/delete", data);
    }

}

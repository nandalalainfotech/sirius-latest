import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";

@Injectable()

export class PaymentManager extends BaseService {

    private paymentUrl: string = `${environment.apiUrl}/paymentcontroller`

    allpayment() {
        return this.getCallService(`${this.paymentUrl}` + "/list");
    }
}
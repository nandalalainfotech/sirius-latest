import { BaseEntity } from "./BaseEntity";
import { Person001mb } from "./Person001mb";

export class Subscriptionmaster001mb extends BaseEntity {
    _id?: any;
    subpname?: string | any;
    description?: string;
    tenure?: string;
    amount?: number;
    status?: string;
    discountflag?: string;
    personid?: Person001mb;
    inserteduser?: String | any;
    inserteddatetime?: String| any;
	updateduser?: String| any;
	updateddatetime?: String| any;
}

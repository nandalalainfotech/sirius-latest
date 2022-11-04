import { BaseEntity } from "./BaseEntity";
import { Categorydetails001mb } from "./Categorydetails001mb";
export class Subcategory001mb extends BaseEntity {
    _id?: any;
    subcatname?: string | any;
    catcode?: Categorydetails001mb;
    status?: string;
    subcatstatus?: string;
    inserteduser?: String | any;
    inserteddatetime?: String| any;
    updateduser?: String| any;
    updateddatetime?: String| any;
}
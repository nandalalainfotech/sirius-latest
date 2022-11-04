
import { BaseEntity } from "./BaseEntity";
import { Categorydetails001mb } from "./Categorydetails001mb";
import { Subcategory001mb } from "./Subcategory001mb";

export class Subcatclassification001mb extends BaseEntity {
    _id?: number;
    subcatclasiid?:number;
    catcode?: Categorydetails001mb;
    subcatcode?:Subcategory001mb;
    classificationname?: string;
    status?: string;
    inserteduser?: String | any;
    inserteddatetime?: String| any;
    updateduser?: String| any;
    updateddatetime?: String| any;
}
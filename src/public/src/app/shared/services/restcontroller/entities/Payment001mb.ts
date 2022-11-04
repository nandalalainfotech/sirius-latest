
import { BaseEntity } from "./BaseEntity";
import { Subscriberdetails001wb } from "./subscriberdetails001wb";
import { Subscriptionmaster001mb } from "./Subscriptionmaster001mb";

export class Payment001mb extends BaseEntity {

   _id?: any;
   payment?: string | any;
   subpid?: Subscriptionmaster001mb;
   subcid?: Subscriberdetails001wb;
   }
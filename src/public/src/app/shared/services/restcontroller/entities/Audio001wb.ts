
import { BaseEntity } from "./BaseEntity";
import { Contentmaster001mb } from "./Contentmaster001mb";

export class Audio001wb extends BaseEntity {
    _id: any;
    audioid?:string;
    contentid?: Contentmaster001mb;
    fieldname?: String;
    filename?: String;
    filepath?: String;
    originalname?: String;
    content?: Buffer;
    flag?:Boolean;
    fileid?:string;
}
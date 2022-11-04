
import { BaseEntity } from "./BaseEntity";
import { Contentmaster001mb } from "./Contentmaster001mb";

export class Video001wb extends BaseEntity {
    _id: any;
    videoid?: string;
    contentid?: Contentmaster001mb;
    fieldname?: String;
    filename?: String;
    filepath?: String;
    originalname?: String;
    content?: Buffer;
    flag?: boolean;
    fileid?: string;
}
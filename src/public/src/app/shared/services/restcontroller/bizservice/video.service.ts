import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Video001wb } from "../entities/Video001wb";


@Injectable()

export class VideoManager extends BaseService {

    private videoUrl: string = `${environment.apiUrl}/videocontroller`

    allvideo() {
        return this.getCallService(`${this.videoUrl}` + "/list");
    }
    
    savesub(video001wb: Video001wb,selectedFile: any) {

        let formData: any = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("filename", selectedFile.name);
        formData.append("filepath", video001wb.filepath);
        formData.append("contentid", video001wb.contentid);
        formData.append("status", video001wb.status);
        formData.append("inserteduser", video001wb.inserteduser);
        formData.append("inserteddatetime", new Date());
        return this.postCallService(`${this.videoUrl}` + "/create", {}, formData).pipe(
            catchError(this.errorMgmt)
        )
        
    }

    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

    updatesub(video001wb: Video001wb,id: any) {
        return this.putCallService(`${this.videoUrl}` + "/update/"+  id,  {}, video001wb);
    }
    updatesubss(video001wb: Video001wb) {
        return this.putCallService(`${this.videoUrl}` + "/update/"+ {}, video001wb);
    }

    deletesub(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.videoUrl}` + "/delete", data);
    }

}
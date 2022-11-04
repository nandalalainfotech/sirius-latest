import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Audio001wb } from "../entities/Audio001wb";


@Injectable()

export class AudioManager extends BaseService {

    private audioUrl: string = `${environment.apiUrl}/audiocontroller`

    allaudio() {
        return this.getCallService(`${this.audioUrl}` + "/list");
    }

    savesub(audio001wb: Audio001wb,selectedFile: any) {

        let formData: any = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("filename", selectedFile.name);
        formData.append("filepath", audio001wb.filepath);
        formData.append("contentid", audio001wb.contentid);
        formData.append("status", audio001wb.status);
        formData.append("inserteduser", audio001wb.inserteduser);
        formData.append("inserteddatetime", new Date());
        return this.postCallService(`${this.audioUrl}` + "/create", {}, formData).pipe(
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

    updatesubss(audio001wb: Audio001wb) {
        return this.putCallService(`${this.audioUrl}` + "/update/"+ {}, audio001wb);
    }
    updatesub(audio001wb: Audio001wb,id: any) {
        return this.putCallService(`${this.audioUrl}` + "/update/" + id, {}, audio001wb);
    }

    deletesub(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.audioUrl}` + "/delete", data);
    }

}
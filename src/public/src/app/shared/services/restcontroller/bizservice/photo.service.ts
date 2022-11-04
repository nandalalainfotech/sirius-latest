import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Photo001wb } from "../entities/Photo001wb";


@Injectable()

export class PhotoManager extends BaseService {

    private photoUrl: string = `${environment.apiUrl}/photocontroller`

    allsub() {
        return this.getCallService(`${this.photoUrl}` + "/list");

    }



    savesub(photo001wb: Photo001wb,selectedFile: any) {

        let formData: any = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("filename", selectedFile.name);
        formData.append("contentid", photo001wb.contentid);
        formData.append("status", photo001wb.status);
        formData.append("filepath", photo001wb.filepath);
        formData.append("inserteduser", photo001wb.inserteduser);
        formData.append("inserteddatetime", new Date());
        return this.postCallService(`${this.photoUrl}` + "/create", {}, formData).pipe(
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

    updatesub(photo001wb: Photo001wb,id: any) {
        return this.putCallService(`${this.photoUrl}` + "/update/"+  id, {}, photo001wb);
    }
    updatesubss(photo001wb: Photo001wb,) {
        return this.putCallService(`${this.photoUrl}` + "/update/"+ {}, photo001wb);
    }
    deletesub(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.photoUrl}` + "/delete", data);
    }

}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconVideoRendererComponent } from 'src/app/shared/services/renderercomponent/iconvideo-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ContentMasterManager } from 'src/app/shared/services/restcontroller/bizservice/contentmaster.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-master.service';
import { VideoManager } from 'src/app/shared/services/restcontroller/bizservice/video.service';
import { Contentmaster001mb } from 'src/app/shared/services/restcontroller/entities/Contentmaster001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/Status001mb';
import { Video001wb } from 'src/app/shared/services/restcontroller/entities/Video001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { VideopopupComponent } from 'src/app/shared/videopopup/videopopup.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  frameworkComponents: any;
  contentid: string = "";
  fieldname:string="";
  filename?: string;
  filepath?: string;
  originalname:string="";
  status:string=""; 
  content?: Buffer;
  videoid:string="";
  public gridOptions: GridOptions | any;
  videoListForm: FormGroup | any;
  submitted = false;
  subcatid:number|any; 
  selectedFile: any;
  photo: Video001wb[] = [];
  contents:  Contentmaster001mb[] = [];
  statussets: Status001mb[] =[];
  inserteduser: any;
  inserteddatetime: any;
  _id: any;
  params: any;
  Video: any;
  public downloadUrl: string = `${environment.apiUrl}/videocontroller/show/`;

  constructor(private videoManager: VideoManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private statusSettingManager: StatusSettingManager,
    private authManager: AuthManager,
    private contentMasterManager: ContentMasterManager,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconVideoRendererComponent
    }
  }
  ngOnInit() {

    this.videoListForm = this.formBuilder.group({
      filename: ['', Validators.required],
      status: [''],
      contentid: ['', Validators.required],
    });

    this.loadData();

    this.createDataGrid001();
   
  }

  loadData() {

    this.contentMasterManager.allcontent().subscribe((response) => {   
      this.contents = deserialize<Contentmaster001mb[]>(Contentmaster001mb, response);
    })

    this.statusSettingManager.allstatus().subscribe(response => {
      this.statussets = deserialize<Status001mb[]>(Status001mb, response);
    });

    this.videoManager.allvideo().subscribe((response) => {
      this.photo = deserialize<Video001wb[]>(Video001wb, response);
      if (this.photo.length > 0) {
        this.gridOptions?.api?.setRowData(this.photo);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })
  }


   get f() { return this.videoListForm.controls; }
  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
      	headerName: '#Id',
      	field: 'videoid',
      	width: 200,
      	flex: 1,
      	sortable: true,
      	filter: true,
      	resizable: true,
      	headerCheckboxSelection: true,
      	headerCheckboxSelectionFilteredOnly: true,
      	checkboxSelection: true,
      	suppressSizeToFit: true,
        hide: "true" 
      },
     {
        headerName: 'Content Id',
        field: 'contentid',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'fieldname',
        field: 'fieldname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'filename',
        field: 'filename',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'originalname',
        field: 'originalname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'content',
        cellRenderer: 'iconRenderer',
        width: 200,
        flex: 1,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onVideoButtonClick.bind(this),
          label: 'video'
        },
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 200,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },
      {
        headerName: 'Audit',
        cellRenderer: 'iconRenderer',
        width: 200,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onAuditButtonClick.bind(this),
          label: 'Audit'
        },
      },
    ];
  }

  onVideoButtonClick(params: any) {    
    const modalRef = this.modalService.open(VideopopupComponent, {backdrop : 'static'});
        modalRef.componentInstance.title = "video";
        modalRef.componentInstance.details = params.data;
        modalRef.componentInstance.sources = this.downloadUrl + params.data.filename;
        modalRef.result.then((flag) => {
          if (flag == 'Yes') {
            
            this.videoManager.allvideo().subscribe((response) => {
              this.photo = deserialize<Video001wb[]>(Video001wb, response);
              if (this.photo.length > 0) {
                this.gridOptions?.api?.setRowData(this.photo);
              } else {
                this.gridOptions?.api?.setRowData([]);
              }
          })
        }
    });
  }

  rowClicked(params: any) {
    params.node.setData({
        ...params.data,
    });
}

  getRowStyle(params) {
   
    if (params.data.status == 'INACTIVE') {
      return { 'background-color': '#ff8080' };
    } else if (params.data.status == 'ACTIVE') {
      return { 'background-color': '#b3ffb3' };
    }
    return;
  }



  onEditButtonClick(params: any) {
    this.contentid = params.data.contentid;
    this.fieldname = params.data.fieldname;
    this.filename = params.data.filename;
    this.originalname = params.data.originalname;
    this.content = params.data.content;
    this.inserteduser = params.data.inserteduser;
    this.inserteddatetime = params.data.inserteddatetime;
    this.videoListForm.patchValue({
      'subcatname': params.data.subcatname, 
      'catcode':params.data.catcode     
    });
  }



  onFileSelected(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
		modalRef.componentInstance.details = "Video";
		modalRef.result.then((data) => {
      
			if (data == "Yes") {       
				this.videoManager.deletesub(params.data._id).subscribe((response) => {
					for (let i = 0; i < this.photo.length; i++) {
						if (this.photo[i]._id == params.data._id) {
							this.photo?.splice(i, 1);
							break;
						}
					}
					const selectedRows = params.api.getSelectedRows();
					params.api.applyTransaction({ remove: selectedRows });
					this.gridOptions.api.deselectAll();
					this.calloutService.showSuccess("Video Removed Successfully");
				});
			}
		})
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "subCategory";
    modalRef.componentInstance.details = params.data;
  }

  onFirstDataRendered(params: any) {
    params.api.sizeColumnsToFit();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onOrderClick(event: any, videoListForm: any) {
    
   this.markFormGroupTouched(this.videoListForm);
		this.submitted = true;
		if (this.videoListForm.invalid) {
			return;
		}
    
    let video001wb = new Video001wb();
		video001wb.filename = this.f.filename.value ? this.f.filename.value : "";
		video001wb.status = "INACTIVE";
    video001wb.contentid = this.f.contentid.value ? this.f.contentid.value : "";

    if (this._id) {
			video001wb._id = this._id;
			video001wb.inserteduser = this.inserteduser;
			video001wb.inserteddatetime = this.inserteddatetime;
			video001wb.updateduser = this.authManager.getcurrentUser.username;
			video001wb.updateddatetime = new Date();
			this.videoManager.updatesubss(video001wb).subscribe((response) => {
				this.calloutService.showSuccess("Video Updated Successfully");
				this.loadData();
				this.videoListForm.reset();
				this._id = null;
				this.submitted = false;
			});

		}
		else {
			video001wb.inserteduser = this.authManager.getcurrentUser.username;
      video001wb.inserteddatetime = new Date();
			this.videoManager.savesub(video001wb, this.selectedFile).subscribe((response) => {
				this.calloutService.showSuccess("Video Saved Successfully");
				this.loadData();
				this.videoListForm.reset();
				this.submitted = false;
			});
		}

  }
  onReset() {
    this.videoListForm.reset();
    this.submitted = false;
  }

}

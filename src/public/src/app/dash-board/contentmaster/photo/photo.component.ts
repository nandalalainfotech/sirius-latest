import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { PhotoManager } from 'src/app/shared/services/restcontroller/bizservice/photo.service';
import { Contentmaster001mb } from 'src/app/shared/services/restcontroller/entities/Contentmaster001mb';
import { Photo001wb } from 'src/app/shared/services/restcontroller/entities/Photo001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver'
import { forkJoin } from 'rxjs';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { ContentMasterManager } from 'src/app/shared/services/restcontroller/bizservice/contentmaster.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-master.service';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/Status001mb';
import { ImagepopupComponent } from 'src/app/shared/imagepopup/imagepopup.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  frameworkComponents: any;
  contentid?: Contentmaster001mb;
  fieldname: string = "";
  filename?: string;
  filepath?: string;
  originalname: string = "";
  content?: Buffer;
  status:string=""; 
  photoid: number | any;
  public gridOptions: GridOptions | any;
  photoListForm: FormGroup | any;
  submitted = false;
  subcatid: number | any;
  photo: Photo001wb[] = [];
  statussets: Status001mb[] =[];
  contents:  Contentmaster001mb[] = [];
  selectedFile: any;
  inserteduser: any;
  inserteddatetime: any;
  image:any;
  arrayBuffer:any;
  buffer:any;
  imageurl:any;
  _id: any;
  public downloadUrl: string = `${environment.apiUrl}/photocontroller/show/`;
  params: any;
  constructor(private photoManager: PhotoManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private statusSettingManager: StatusSettingManager,
    private authManager: AuthManager,
    private contentMasterManager: ContentMasterManager,
    private modalService: NgbModal,  private sanitizer: DomSanitizer) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }

  }
  ngOnInit() {
    

    this.photoListForm = this.formBuilder.group({
      filename: ['', Validators.required],
      status: [''],
      contentid: ['', Validators.required],
    });

    this.loadData();

    this.createDataGrid001();

    let res0 = this.contentMasterManager.allcontent();
    let res1 = this.statusSettingManager.allstatus();
    let res2 = this.photoManager.allsub();
  
    forkJoin([res0, res1, res2]).subscribe((data: any) => {
      this.contents = deserialize<Contentmaster001mb[]>(Contentmaster001mb, data[0]);
      this.statussets = deserialize<Status001mb[]>(Status001mb, data[1]);
      this.photo = deserialize<Photo001wb[]>(Photo001wb, data[2]);
      this.loadData();
    });


    this.contentMasterManager.allcontent().subscribe((response) => {   
      this.contents = deserialize<Contentmaster001mb[]>(Contentmaster001mb, response);
    })

    this.statusSettingManager.allstatus().subscribe(response => {
      this.statussets = deserialize<Status001mb[]>(Status001mb, response);
    });

   
  }

  loadData() {
    this.photoManager.allsub().subscribe((response) => {
      this.photo = deserialize<Photo001wb[]>(Photo001wb, response);
      if (this.photo.length > 0) {
        this.gridOptions?.api?.setRowData(this.photo);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })
  }

  get f() { return this.photoListForm.controls; }

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
        field: 'photoid',
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
          onClick: this.onphotoButtonClick.bind(this),
          label: 'image'
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

  rowClicked(params: any) {
    params.node.setData({
        ...params.data,
    });
}

  getRowStyle(params: any) {
   console.log("params.data.status", params.data.status);
    if (params.data.status == 'INACTIVE') {
      return { 'background-color': '#ff8080' };
    } 
     if (params.data.status == 'ACTIVE') {
      return { 'background-color': '#b3ffb3' };
    }
  }

  onphotoButtonClick(params: any) {    
    const modalRef = this.modalService.open(ImagepopupComponent,{backdrop : 'static'});
    modalRef.componentInstance.title = "image";
    modalRef.componentInstance.details = params.data;
    modalRef.componentInstance.source = this.downloadUrl + params.data.filename;
    modalRef.result.then((flag) => {
      if (flag == 'Yes') {
        
        this.photoManager.allsub().subscribe((response) => {
          this.photo = deserialize<Photo001wb[]>(Photo001wb, response);
          if (this.photo.length > 0) {
            this.gridOptions?.api?.setRowData(this.photo);
          } else {
            this.gridOptions?.api?.setRowData([]);
          }
        })
      }
    });
  }

  onEditButtonClick(params: any) {
    this._id = params.data._id;
    this.inserteduser = params.data.inserteduser;
    this.inserteddatetime = params.data.inserteddatetime;
    this.photoListForm.patchValue({
      'subcatname': params.data.subcatname,
      'catcode': params.data.catcode
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
		modalRef.componentInstance.details = "Photo";
		modalRef.result.then((data) => {
      
			if (data == "Yes") {       
				this.photoManager.deletesub(params.data._id).subscribe((response) => {
					for (let i = 0; i < this.photo.length; i++) {
						if (this.photo[i]._id == params.data._id) {
							this.photo?.splice(i, 1);
							break;
						}
					}
					const selectedRows = params.api.getSelectedRows();
					params.api.applyTransaction({ remove: selectedRows });
					this.gridOptions.api.deselectAll();
					this.calloutService.showSuccess("Image Removed Successfully");
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

  onOrderClick(event: any, photoListForm: any) {

    console.log("photoListForm", photoListForm);
   
    this.markFormGroupTouched(this.photoListForm);
		this.submitted = true;
		if (this.photoListForm.invalid) {
			return;
		}
    
    let photo001wb = new Photo001wb();
		photo001wb.filename = this.f.filename.value ? this.f.filename.value : "";
		photo001wb.status = "INACTIVE";
    photo001wb.contentid = this.f.contentid.value ? this.f.contentid.value : "";

    if (this._id) {
			photo001wb._id = this._id;
			photo001wb.inserteduser = this.inserteduser;
			photo001wb.inserteddatetime = this.inserteddatetime;
			photo001wb.updateduser = this.authManager.getcurrentUser.username;
			photo001wb.updateddatetime = new Date();
			this.photoManager.updatesubss(photo001wb).subscribe((response) => {
				this.calloutService.showSuccess("Image Updated Successfully");
				this.loadData();
				this.photoListForm.reset();
				this._id = null;
				this.submitted = false;
			});

		}
		else {
			photo001wb.inserteduser = this.authManager.getcurrentUser.username;
      photo001wb.inserteddatetime = new Date();
			this.photoManager.savesub(photo001wb, this.selectedFile).subscribe((response) => {
				this.calloutService.showSuccess("Image Saved Successfully");
				this.loadData();
				this.photoListForm.reset();
				this.submitted = false;
			});
		}

  }
  onReset() {
    this.photoListForm.reset();
    this.submitted = false;
  }

}


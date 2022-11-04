import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AudiopopupComponent } from 'src/app/shared/audiopopup/audiopopup.component';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { IconAudioRendererComponent } from 'src/app/shared/services/renderercomponent/iconaudio-renderer-component';
import { AudioManager } from 'src/app/shared/services/restcontroller/bizservice/audio.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ContentMasterManager } from 'src/app/shared/services/restcontroller/bizservice/contentmaster.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-master.service';
import { Audio001wb } from 'src/app/shared/services/restcontroller/entities/Audio001wb';
import { Contentmaster001mb } from 'src/app/shared/services/restcontroller/entities/Contentmaster001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/Status001mb';

import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  frameworkComponents: any;
  contentid?:Contentmaster001mb;
  fieldname:string="";
  filename?: string;
  filepath?: string;
  originalname:string="";
  status:string=""; 
  content?: Buffer;
  audioid:string|any;
  public gridOptions: GridOptions | any;
  audioListForm: FormGroup | any;
  submitted = false;
  statussets: Status001mb[] =[];
  contents:  Contentmaster001mb[] = [];
  selectedFile: any;
  audio: Audio001wb[] = [];
  inserteduser: any;
  inserteddatetime: any;
  _id: any;
  params: any;
  public downloadUrl: string = `${environment.apiUrl}/audiocontroller/show/`;

  constructor(private audioManager: AudioManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private statusSettingManager: StatusSettingManager,
    private authManager: AuthManager,
    private contentMasterManager: ContentMasterManager,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconAudioRendererComponent
    }
  }
  ngOnInit() {

    this.loadData();

    this.audioListForm = this.formBuilder.group({
      filename: ['', Validators.required],
      status: [''],
      contentid: ['', Validators.required],
    });

    this.createDataGrid001();
   
  }

  loadData() {

    this.contentMasterManager.allcontent().subscribe((response) => {   
      this.contents = deserialize<Contentmaster001mb[]>(Contentmaster001mb, response);
    })

    this.statusSettingManager.allstatus().subscribe(response => {
      this.statussets = deserialize<Status001mb[]>(Status001mb, response);
    });

    this.audioManager.allaudio().subscribe((response) => {
      this.audio = deserialize<Audio001wb[]>(Audio001wb, response);      
     
      if (this.audio.length > 0) {
        this.gridOptions?.api?.setRowData(this.audio);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })

  }

   get f() { return this.audioListForm.controls; }
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
      	field: 'audioid',
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
          onClick: this.onAudioButtonClick.bind(this),
          label: 'audio'
        },
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      // {
      //   headerName: 'Edit',
      //   cellRenderer: 'iconRenderer',
      //   width: 200,
      //   flex: 1,
      //   suppressSizeToFit: true,
      //   cellStyle: { textAlign: 'center' },
      //   cellRendererParams: {
      //     onClick: this.onEditButtonClick.bind(this),
      //     label: 'Edit'
      //   },
      // },
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

  onAudioButtonClick(params: any) {    
    const modalRef = this.modalService.open(AudiopopupComponent,{backdrop : 'static'});
    modalRef.componentInstance.title = "audio";
    modalRef.componentInstance.details = params.data;
    modalRef.componentInstance.sources = this.downloadUrl + params.data.filename;
    modalRef.result.then((flag) => {
      if (flag == 'Yes') {
        
        this.audioManager.allaudio().subscribe((response) => {
          this.audio = deserialize<Audio001wb[]>(Audio001wb, response);      
         
          if (this.audio.length > 0) {
            this.gridOptions?.api?.setRowData(this.audio);
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
    this._id = params.data._id;
    this.inserteduser = params.data.inserteduser;
    this.inserteddatetime = params.data.inserteddatetime;
    this.audioListForm.patchValue({
      'filename': params.data.filename, 
      'status':params.data.status,
      'contentid': params.data.contentid    
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
		modalRef.componentInstance.details = "Audio";
		modalRef.result.then((data) => {
      
			if (data == "Yes") {       
				this.audioManager.deletesub(params.data._id).subscribe((response) => {
					for (let i = 0; i < this.audio.length; i++) {
						if (this.audio[i]._id == params.data._id) {
							this.audio?.splice(i, 1);
							break;
						}
					}
					const selectedRows = params.api.getSelectedRows();
					params.api.applyTransaction({ remove: selectedRows });
					this.gridOptions.api.deselectAll();
					this.calloutService.showSuccess("Audio Removed Successfully");
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

  onOrderClick(event: any, audioListForm: any) {
    
    this.markFormGroupTouched(this.audioListForm);
		this.submitted = true;
		if (this.audioListForm.invalid) {
			return;
		}
    
    let audio001wb = new Audio001wb();    

		audio001wb.filename = this.f.filename.value ? this.f.filename.value : "";
		audio001wb.status = "INACTIVE"
    audio001wb.contentid = this.f.contentid.value ? this.f.contentid.value : "";

    if (this._id) {
			audio001wb._id = this._id;
			audio001wb.inserteduser = this.inserteduser;
			audio001wb.inserteddatetime = this.inserteddatetime;
			audio001wb.updateduser = this.authManager.getcurrentUser.username;
			audio001wb.updateddatetime = new Date();
			this.audioManager.updatesubss(audio001wb).subscribe((response) => {
				this.calloutService.showSuccess("Audio Updated Successfully");
				this.loadData();
				this.audioListForm.reset();
				this._id = null;
				this.submitted = false;
			});

		}
		else {
			audio001wb.inserteduser = this.authManager.getcurrentUser.username;
      audio001wb.inserteddatetime = new Date();
			this.audioManager.savesub(audio001wb, this.selectedFile).subscribe((response) => {
				this.calloutService.showSuccess("Audio Saved Successfully");
				this.loadData();
				this.audioListForm.reset();
				this.submitted = false;
			});
		}
  }
  onReset() {
    this.audioListForm.reset();
    this.submitted = false;
  }

 
}

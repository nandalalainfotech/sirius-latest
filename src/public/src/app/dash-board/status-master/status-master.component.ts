import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-master.service';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/Status001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { deserialize } from 'serializer.ts/Serializer';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Utils } from 'src/app/shared/utils/utils';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';

@Component({
  selector: 'app-status-master',
  templateUrl: './status-master.component.html',
  styleUrls: ['./status-master.component.css']
})
export class StatusMasterComponent implements OnInit {

  
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  StatusForm: FormGroup | any;
  name: string = "";
  _id: any
  inserteduser: any;
  inserteddatetime: any;
  updatedUser: string | null = "";
  updatedDatetime: Date | any;
  submitted = false;
  status: Status001mb[] =[];

  isOpen: boolean = false;
  parentMenuString: string = '';
  childMenuString: string = '';
  isActive: boolean | undefined;
  user?: Login001mb;
  themes: any;
  // rgbToHex: any;
  // hexToRgb: any;
  login001mb: Login001mb = new Login001mb();
  color: any;
  defaultTheme: string = '#286090';
  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;
  

  constructor(private statusSettingManager: StatusSettingManager,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private dataSharedService: DataSharedService,
    private authManger: AuthManager,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe,
    private modalService: NgbModal,) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    

    this.createDataGrid001();
    this.StatusForm = this.formBuilder.group({
      name: ['', Validators.required],
    })

    this.loadData();


    this.user = this.authManger.getcurrentUser;

    
    this.dataSharedService.currentMenuObject.subscribe((object: any) => {
      this.parentMenuString = object.parentMenuString;
      this.childMenuString = object.childMenuString;
    });

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);
      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);
      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);
      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });

    
  }

  loadData() {

    this.statusSettingManager.allstatus().subscribe(response => {
      this.status = deserialize<Status001mb[]>(Status001mb, response);
      if (this.status.length > 0) {
        this.gridOptions?.api?.setRowData(this.status);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }


  get f() { return this.StatusForm.controls; }
  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
      	headerName: '#Id',
      	field: 'submid',
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
        headerName: 'Status',
        field: 'name',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 200,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
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
  onEditButtonClick(params: any) {
    this._id = params.data._id;
    this.inserteduser = params.data.inserteduser;
    this.inserteddatetime = params.data.inserteddatetime;
    this.StatusForm.patchValue({
      'name': params.data.name, 
    });
  }

  onDeleteButtonClick(params: any) {   
    const modalRef = this.modalService.open(ConformationComponent);
		modalRef.componentInstance.details = "Status List";
		modalRef.result.then((data) => {
			if (data == "Yes") {
        
				this.statusSettingManager.deletestatus(params.data._id).subscribe((response) => {
					for (let i = 0; i < this.status.length; i++) {
						if (this.status[i]._id == params.data._id) {
							this.status?.splice(i, 1);
							break;
						}
					}
					const selectedRows = params.api.getSelectedRows();
					params.api.applyTransaction({ remove: selectedRows });
					this.gridOptions.api.deselectAll();
					this.calloutService.showSuccess("Status Master Details Removed Successfully");
				});
			}
		})
  }


  
  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "StatusForm";
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
  onStatusClick(event: any, StatusForm: any) {  
        
    this.markFormGroupTouched(this.StatusForm);
		this.submitted = true;
		if (this.StatusForm.invalid) {
			return;
		}
    
    let status001mb = new Status001mb();
		status001mb.name = this.f.name.value ? this.f.name.value : "";

    if (this._id) {
			status001mb._id = this._id;
			status001mb.inserteduser = this.inserteduser;
			status001mb.inserteddatetime = this.inserteddatetime;
			status001mb.updateduser = this.authManager.getcurrentUser.username;
			status001mb.updateddatetime = new Date();
			this.statusSettingManager.updatestatus(status001mb).subscribe((response) => {
				this.calloutService.showSuccess("Status Master Details Updated Successfully");
				this.loadData();
				this.StatusForm.reset();
				this._id = null;
				this.submitted = false;
			});

		}
		else {
      
      
			status001mb.inserteduser = this.authManager.getcurrentUser.username;
      status001mb.inserteddatetime = new Date();
			this.statusSettingManager.savestatus(status001mb).subscribe((response) => {
				this.calloutService.showSuccess("Status Master Details Saved Successfully");
				this.loadData();
				this.StatusForm.reset();
				this.submitted = false;
			});
		}

		
  }
  onReset() {
    this.StatusForm.reset();
    this.submitted = false;
  }


}

import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { forkJoin } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LoginManager } from 'src/app/shared/services/restcontroller/bizservice/login.service';
import { PersonManager } from 'src/app/shared/services/restcontroller/bizservice/person.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-master.service';
import { SubscriptionmasterManager } from 'src/app/shared/services/restcontroller/bizservice/subscriptionmaster.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Person001mb } from 'src/app/shared/services/restcontroller/entities/Person001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/Status001mb';
import { Subscriptionmaster001mb } from 'src/app/shared/services/restcontroller/entities/Subscriptionmaster001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-subscriptionmaster',
  templateUrl: './subscriptionmaster.component.html',
  styleUrls: ['./subscriptionmaster.component.css']
})
export class SubscriptionmasterComponent implements OnInit {

  frameworkComponents: any;
  subpname: string="";
  description: string= "";
  tenure: string= "";
  status: string = "";
  amount: number|any;
  discountflag?: string= "";
  personid: string="";
  subpid:string|any;
  public gridOptions: GridOptions | any;
  persons: Person001mb[] = [];
  login: Login001mb[] = []
  subMasterForm: FormGroup | any;
  submitted = false;
  subscriptionmaster: Subscriptionmaster001mb[] = [];
  statussets: Status001mb[] =[];
  inserteduser: any;
  inserteddatetime: any;
  _id: any;
  isOpen: boolean = false;
  parentMenuString: string = '';
  childMenuString: string = '';
  isActive: boolean | undefined;
  user?: Login001mb;
  themes: any;
  login001mb: Login001mb = new Login001mb();


  constructor(private subscriptionmasterManager: SubscriptionmasterManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private statusSettingManager: StatusSettingManager,
    private authManager: AuthManager,
    private dataSharedService: DataSharedService,
    private authManger: AuthManager,
    private personManager: PersonManager,
    private loginManager: LoginManager,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }
  ngOnInit() {

    this.createDataGrid001();


    this.subMasterForm = this.formBuilder.group({
      subpname: ['', Validators.required],
      description: ['', Validators.required],
      tenure: ['', Validators.required],
      amount: ['', Validators.required],
      status: ['', Validators.required],
      discountflag: ['', Validators.required],
      personid: ['', Validators.required]
    });

    this.user = this.authManger.getcurrentUser;
    
    this.dataSharedService.currentMenuObject.subscribe((object: any) => {
      this.parentMenuString = object.parentMenuString;
      this.childMenuString = object.childMenuString;
    });

    

    let res0 = this.subscriptionmasterManager.allsubmaster();
    let res1 = this.statusSettingManager.allstatus();
    let res2 = this.personManager.allperson();
  
    forkJoin([res0, res1, res2]).subscribe((data: any) => {
      this.subscriptionmaster = deserialize<Subscriptionmaster001mb[]>(Subscriptionmaster001mb, data[0]);
      this.statussets = deserialize<Status001mb[]>(Status001mb, data[1]);
      this.persons = deserialize<Person001mb[]>(Person001mb, data[2]);
      this.loadData();
    });


    this.personManager.allperson().subscribe((response) => {
      this.persons =  deserialize<Person001mb[]>(Person001mb, response);                
    })

    this.statusSettingManager.allstatus().subscribe(response => {
      this.statussets = deserialize<Status001mb[]>(Status001mb, response);
    });

    
  }

  loadData() {
    this.subscriptionmasterManager.allsubmaster().subscribe((response) => {   
      this.subscriptionmaster = deserialize<Subscriptionmaster001mb[]>(Subscriptionmaster001mb, response);
      if (this.subscriptionmaster.length > 0) {
        this.gridOptions?.api?.setRowData(this.subscriptionmaster);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })
  }

   get f() { return this.subMasterForm.controls; }
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
        headerName: 'Person Name',
        field: 'personid',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setPersonname.bind(this)
      },
      {
        headerName: 'subpname',
        field: 'subpname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'description',
        field: 'description',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'tenure',
        field: 'tenure',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'amount',
        field: 'amount',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'discountflag',
        field: 'discountflag',
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
        valueGetter: this.setStatusname.bind(this)
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

  setStatusname(params: any): string {  
    return params.data.status ? this.statussets.find(x => x._id === params.data.status)?.name: "";
  }

  onEditButtonClick(params: any) {
    this._id = params.data._id;
    this.inserteduser = params.data.inserteduser;
    this.inserteddatetime = params.data.inserteddatetime;
    this.subMasterForm.patchValue({
      'subpname': params.data.subpname, 
      'description':params.data.description,
      'tenure': params.data.tenure, 
      'amount':params.data.amount,
      'discountflag': params.data.discountflag,
      'status': params.data.status,
      'personid': params.data.personid
    });
  }

  onDeleteButtonClick(params: any) {    
    const modalRef = this.modalService.open(ConformationComponent);
		modalRef.componentInstance.details = "Subscriber Detail List";
		modalRef.result.then((data) => {
			if (data == "Yes") {
        
				this.subscriptionmasterManager.deletesub(params.data._id).subscribe((response) => {
					for (let i = 0; i < this.subscriptionmaster.length; i++) {
						if (this.subscriptionmaster[i]._id == params.data._id) {
							this.subscriptionmaster?.splice(i, 1);
							break;
						}
					}
					const selectedRows = params.api.getSelectedRows();
					params.api.applyTransaction({ remove: selectedRows });
					this.gridOptions.api.deselectAll();
					this.calloutService.showSuccess("Subscription Master Details Removed Successfully");
				});
			}
		})
  }

  setPersonname(params: any): string {  
    return params.data.personid ? this.persons.find(x => x._id === params.data.personid)?.firstname.concat(" " + this.persons.find(x => x._id === params.data.personid)?.lastname): '';
  }


  
  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "subMasterForm";
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
  onOrderClick(event: any, subMasterForm: any) { 
         
    
    this.markFormGroupTouched(this.subMasterForm);
		this.submitted = true;
		if (this.subMasterForm.invalid) {
			return;
		}
    
    let subscriptionmaster001mb = new Subscriptionmaster001mb();
		subscriptionmaster001mb.subpname = this.f.subpname.value ? this.f.subpname.value : "";
    subscriptionmaster001mb.description = this.f.description.value ? this.f.description.value : "";
		subscriptionmaster001mb.tenure = this.f.tenure.value ? this.f.tenure.value : "";
    subscriptionmaster001mb.amount = this.f.amount.value ? this.f.amount.value : "";
		subscriptionmaster001mb.discountflag = this.f.discountflag.value ? this.f.discountflag.value : "";
    subscriptionmaster001mb.status = this.f.status.value ? this.f.status.value : "";
    subscriptionmaster001mb.personid = this.f.personid.value ? this.f.personid.value : "";

    if (this._id) {
			subscriptionmaster001mb._id = this._id;
			subscriptionmaster001mb.inserteduser = this.inserteduser;
			subscriptionmaster001mb.inserteddatetime = this.inserteddatetime;
			subscriptionmaster001mb.updateduser = this.authManager.getcurrentUser.username;
			subscriptionmaster001mb.updateddatetime = new Date();
			this.subscriptionmasterManager.updatesub(subscriptionmaster001mb).subscribe((response) => {
				this.calloutService.showSuccess("Subscription Master Details Updated Successfully");
				this.loadData();
				this.subMasterForm.reset();
				this._id = null;
				this.submitted = false;
			});

		}
		else {
      
      
			subscriptionmaster001mb.inserteduser = this.authManager.getcurrentUser.username;
      subscriptionmaster001mb.inserteddatetime = new Date();
			this.subscriptionmasterManager.savesub(subscriptionmaster001mb).subscribe((response) => {
				this.calloutService.showSuccess("Subscription Master Details Saved Successfully");
				this.loadData();
				this.subMasterForm.reset();
				this.submitted = false;
			});
		}

		
  }
  onReset() {
    this.subMasterForm.reset();
    this.submitted = false;
  }


}

import { DatePipe } from '@angular/common';
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
import { ContentMasterManager } from 'src/app/shared/services/restcontroller/bizservice/contentmaster.service';
import { LoginManager } from 'src/app/shared/services/restcontroller/bizservice/login.service';
import { PaymentManager } from 'src/app/shared/services/restcontroller/bizservice/payment.service';
import { PersonManager } from 'src/app/shared/services/restcontroller/bizservice/person.service';
import { SubscriberdetailsManager } from 'src/app/shared/services/restcontroller/bizservice/subscriberdetails.service';
import { SubscriptionmasterManager } from 'src/app/shared/services/restcontroller/bizservice/subscriptionmaster.service';
import { Contentmaster001mb } from 'src/app/shared/services/restcontroller/entities/Contentmaster001mb';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Payment001mb } from 'src/app/shared/services/restcontroller/entities/Payment001mb';
import { Person001mb } from 'src/app/shared/services/restcontroller/entities/Person001mb';
import { Subscriberdetails001wb } from 'src/app/shared/services/restcontroller/entities/subscriberdetails001wb';
import { Subscriptionmaster001mb } from 'src/app/shared/services/restcontroller/entities/Subscriptionmaster001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-subcriberdetails',
  templateUrl: './subcriberdetails.component.html',
  styleUrls: ['./subcriberdetails.component.css']
})
export class SubcriberdetailsComponent implements OnInit {

  frameworkComponents: any;
  personid: Person001mb[] = [];
  subscriptionmaster: Subscriptionmaster001mb[] = [];
  payid: Payment001mb[] = [];
  payment: Payment001mb[] = [];
  contentid: Contentmaster001mb[] = [];
  content:  Contentmaster001mb[] = [];
  horoscope: string = "";
  subscdesc: string = "";
  subscapproval?: string = "";
  approvedby?: string;
  approvedon?: Date | any;
  subdid: string | any;
  public gridOptions: GridOptions | any;
  subDetailForm: FormGroup | any;
  submitted = false;
  subscriberdetails: Subscriberdetails001wb[] = [];
  persons: Person001mb[] = [];
  login: Login001mb[] = [];
  inserteduser: any;
  inserteddatetime: any;
  _id: any;
  isOpen: boolean = false;
  parentMenuString: string = '';
  childMenuString: string = '';
  isActive: boolean | undefined;
  user?: Login001mb;
  themes: any;
  minDate = new Date();
  maxDate = new Date();
  // rgbToHex: any;
  // hexToRgb: any;
  login001mb: Login001mb = new Login001mb();
 


  constructor(private subscriberdetailsManager: SubscriberdetailsManager,
    private paymentManager: PaymentManager,
    private loginManager: LoginManager,
    private contentMasterManager: ContentMasterManager,
    private datepipe: DatePipe,
    private personManager: PersonManager,
    private formBuilder: FormBuilder,
    private subscriptionmasterManager: SubscriptionmasterManager,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private dataSharedService: DataSharedService,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }
  ngOnInit() {

    this.createDataGrid001();

    this.maxDate.setFullYear(this.maxDate.getFullYear() + 10);

    this.subDetailForm = this.formBuilder.group({ 
      horoscope: ['', Validators.required],
      subscdesc: ['', Validators.required],
      subscapproval: ['', Validators.required],
      approvedby: ['', Validators.required],
      approvedon: ['', Validators.required],
      subpid: ['', Validators.required],
      payid: ['', Validators.required],
      contentid: ['', Validators.required],
      personid: ['', Validators.required]
    });

    this.user = this.authManager.getcurrentUser;
    this.dataSharedService.currentMenuObject.subscribe((object: any) => {
      this.parentMenuString = object.parentMenuString;
      this.childMenuString = object.childMenuString;
    });

   

    let res0 = this.subscriptionmasterManager.allsubmaster();
    let res1 = this.paymentManager.allpayment();
    let res2 = this.contentMasterManager.allcontent();
    let res3 = this.personManager.allperson();
  
    forkJoin([res0, res1, res2, res3]).subscribe((data: any) => {
      this.subscriptionmaster = deserialize<Subscriptionmaster001mb[]>(Subscriptionmaster001mb, data[0]);
      this.payment = deserialize<Payment001mb[]>(Payment001mb, data[1]);
      this.content = deserialize<Contentmaster001mb[]>(Contentmaster001mb, data[2]);
      this.persons = deserialize<Person001mb[]>(Person001mb, data[3]);
      this.loadData();
    });

    this.subscriptionmasterManager.allsubmaster().subscribe((response) => {   
      this.subscriptionmaster = deserialize<Subscriptionmaster001mb[]>(Subscriptionmaster001mb, response);
    })

    this.paymentManager.allpayment().subscribe((response) => {   
      this.payment = deserialize<Payment001mb[]>(Payment001mb, response);
    })

    this.contentMasterManager.allcontent().subscribe((response) => {   
      this.content = deserialize<Contentmaster001mb[]>(Contentmaster001mb, response);
    })

    this.personManager.allperson().subscribe((response) => {
      this.persons = deserialize<Person001mb[]>(Person001mb, response);
    })

    
  }

  loadData() {
    this.subscriberdetailsManager.allsubdetails().subscribe((response) => {
      
      this.subscriberdetails = deserialize<Subscriberdetails001wb[]>(Subscriberdetails001wb, response);
      if (this.subscriberdetails.length > 0) {
        this.gridOptions?.api?.setRowData(this.subscriberdetails);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })
  }

  get f() { return this.subDetailForm.controls; }
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
        field: 'subdid',
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
        headerName: 'Subscription Name',
        field: 'subpid',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setSubname.bind(this)
      },
      {
        headerName: 'payid',
        field: 'payid',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setPaymentname.bind(this)
      },
      {
        headerName: 'Content Id',
        field: 'contentid',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'horoscope',
        field: 'horoscope',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'subscdesc',
        field: 'subscdesc',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'subscapproval',
        field: 'subscapproval',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'approvedby',
        field: 'approvedby',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'approvedon',
        field: 'approvedon',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.approvedon ? this.datepipe.transform(params.data.approvedon, 'dd-MM-yyyy') : '';
      }
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

  setSubname(params: any): string {  
    return params.data.subpid ? this.subscriptionmaster.find(x => x._id === params.data.subpid)?.subpname: '';
  }

  setPaymentname(params: any): string {  
    return params.data.payid ? this.payment.find(x => x._id === params.data.payid)?.payment: '';
  }

  setPersonname(params: any): any {  
    return params.data.personid ? this.persons.find(x => x._id === params.data.personid)?.firstname.concat(" "+ this.persons.find(x => x._id === params.data.personid)?.lastname): '';

  }
  

  onEditButtonClick(params: any) {
    this._id = params.data._id;
    this.inserteduser = params.data.inserteduser;
    this.inserteddatetime = params.data.inserteddatetime;
    this.subDetailForm.patchValue({
      'horoscope': params.data.horoscope, 
      'subscdesc':params.data.subscdesc,  
      'subscapproval': params.data.subscapproval, 
      'approvedby':params.data.approvedby,  
      'approvedon': new Date(params.data.approvedon),
      'subpid': params.data.subpid,
      'payid': params.data.payid,
      'contentid': params.data.contentid,
      'personid': params.data.personid,
    });
  }
  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
		modalRef.componentInstance.details = "Subscriber Detail List";
		modalRef.result.then((data) => {
			if (data == "Yes") {
				this.subscriberdetailsManager.deletesub(params.data._id).subscribe((response) => {
					for (let i = 0; i < this.subscriberdetails.length; i++) {
						if (this.subscriberdetails[i]._id == params.data._id) {
							this.subscriberdetails?.splice(i, 1);
							break;
						}
					}
					const selectedRows = params.api.getSelectedRows();
					params.api.applyTransaction({ remove: selectedRows });
					this.gridOptions.api.deselectAll();
					this.calloutService.showSuccess("Subscription Details Removed Successfully");
				});
			}
		})
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "subDetailForm";
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
  onOrderClick(event: any, subDetailForm: any) {   
        
    this.markFormGroupTouched(this.subDetailForm);
		this.submitted = true;
		if (this.subDetailForm.invalid) {
			return;
		}
    
    
    
    let subscriberdetails001wb = new Subscriberdetails001wb();
    subscriberdetails001wb.horoscope = this.f.horoscope.value ? this.f.horoscope.value : "";
    subscriberdetails001wb.subscdesc = this.f.subscdesc.value ? this.f.subscdesc.value : "";
		subscriberdetails001wb.subscapproval = this.f.subscapproval.value ? this.f.subscapproval.value : "";
    subscriberdetails001wb.approvedby = this.f.approvedby.value ? this.f.approvedby.value : "";
		subscriberdetails001wb.approvedon = this.f.approvedon.value ? this.f.approvedon.value : "";
    subscriberdetails001wb.subpid = this.f.subpid.value ? this.f.subpid.value : "";
    subscriberdetails001wb.payid = this.f.payid.value ? this.f.payid.value : "";
    subscriberdetails001wb.contentid = this.f.contentid.value ? this.f.contentid.value : "";
    subscriberdetails001wb.personid = this.f.personid.value ? this.f.personid.value : "";

    
    if (this._id) {
			subscriberdetails001wb._id = this._id;
			subscriberdetails001wb.inserteduser = this.inserteduser;
			subscriberdetails001wb.inserteddatetime = this.inserteddatetime;
			subscriberdetails001wb.updateduser = this.authManager.getcurrentUser.username;
			subscriberdetails001wb.updateddatetime = new Date();
			this.subscriberdetailsManager.updatesub(subscriberdetails001wb).subscribe((response) => {
				this.calloutService.showSuccess("Subscription Details Updated Successfully");
				this.loadData();
				this.subDetailForm.reset();
				this._id = null;
				this.submitted = false;
			});

		}
		else {
			subscriberdetails001wb.inserteduser = this.authManager.getcurrentUser.username;
      subscriberdetails001wb.inserteddatetime = new Date();
			this.subscriberdetailsManager.savesub(subscriberdetails001wb).subscribe((response) => {
				this.calloutService.showSuccess("Subscription Details Saved Successfully");
				this.loadData();
				this.subDetailForm.reset();
				this.submitted = false;
			});
		}
  }
  onReset() {
    this.subDetailForm.reset();
    this.submitted = false;
  }

 
}

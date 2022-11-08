import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { forkJoin } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CategoryManager } from 'src/app/shared/services/restcontroller/bizservice/category.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-master.service';
import { SubCatClassificationManager } from 'src/app/shared/services/restcontroller/bizservice/subcatcassification.service';
import { SubCategoryManager } from 'src/app/shared/services/restcontroller/bizservice/subcategorymanager.service';
import { Categorydetails001mb } from 'src/app/shared/services/restcontroller/entities/Categorydetails001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/Status001mb';
import { Subcatclassification001mb } from 'src/app/shared/services/restcontroller/entities/Subcatclassification001mb';
import { Subcategory001mb } from 'src/app/shared/services/restcontroller/entities/Subcategory001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-subcatclassification',
  templateUrl: './subcatclassification.component.html',
  styleUrls: ['./subcatclassification.component.css']
})
export class SubcatclassificationComponent implements OnInit {

  frameworkComponents: any;
  subcatname: string = "";
  catcode:string="";
  subcatcode:string="";
  classificationname:string="";
  status: string="";
  public gridOptions: GridOptions | any;
  subCatClassiForm: FormGroup | any;
  submitted = false;
  subcatclasiid:number|any; 
  subCatClassification: Subcatclassification001mb[] = [];
  subCategory: Subcategory001mb[] = [];
  subcategory001mb: Subcategory001mb[] = [];
  Categorydetails: Categorydetails001mb[] = [];
  statussets: Status001mb[] =[];
  inserteduser: any;
  inserteddatetime: any;
  _id: any;
  constructor(private  subcatclassificationManager: SubCatClassificationManager,
    private subCategoryManager: SubCategoryManager,
    private statusSettingManager: StatusSettingManager,
    private categoryManager: CategoryManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private authManager: AuthManager,
    private modalService: NgbModal) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }
  ngOnInit() {

    this.createDataGrid001();

    this.subCatClassiForm = this.formBuilder.group({
      classificationname: ['', Validators.required],
      status: ['', Validators.required],
      catcode: ['', Validators.required],
      subcatcode: ['', Validators.required],
    });

    this.categoryManager.allcatg().subscribe((response) => {
      this.Categorydetails = deserialize<Categorydetails001mb[]>(Categorydetails001mb, response);
      
    })

    let res0 = this.categoryManager.allcatg();
    let res1 = this.subCategoryManager.allsub();
    let res2 = this.subcatclassificationManager.allsubclasi();
    let res3 = this.statusSettingManager.allstatus();
  
    forkJoin([res0, res1, res2, res3]).subscribe((data: any) => {
      this.Categorydetails = deserialize<Categorydetails001mb[]>(Categorydetails001mb, data[0]);
      this.subCategory = deserialize<Subcategory001mb[]>(Subcategory001mb, data[1]);
      this.subCatClassification = deserialize<Subcatclassification001mb[]>(Subcatclassification001mb, data[2]);
      this.statussets = deserialize<Status001mb[]>(Status001mb, data[3]);
      this.loadData();
    });

    this.subCategoryManager.allsub().subscribe((response) => {
      this.subCategory = deserialize<Subcategory001mb[]>(Subcategory001mb, response);
     
    })

    this.statusSettingManager.allstatus().subscribe(response => {
      this.statussets = deserialize<Status001mb[]>(Status001mb, response);
    });
    
  }

  loadData() {
    this.subcatclassificationManager.allsubclasi().subscribe((response) => {
      this.subCatClassification = deserialize<Subcatclassification001mb[]>(Subcatclassification001mb, response);
      if (this.subCatClassification.length > 0) {
        this.gridOptions?.api?.setRowData(this.subCatClassification);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })
  }

  get f() { return this.subCatClassiForm.controls; }
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
      	field: 'subcatclasiid',
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
        headerName: 'Category Name',
        field: 'catcode',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setCatname.bind(this)
      },
      {
        headerName: 'Subcat Name',
        field: 'subcatcode',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setSubCatname.bind(this)
      },
      {
        headerName: 'Classificationname',
        field: 'classificationname',
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

  setCatname(params: any): string {  
    return params.data.catcode ? this.Categorydetails.find(x => x._id === params.data.catcode)?.catname: "";
  }

  setSubCatname(params: any): string {  
    return params.data.subcatcode ? this.subCategory.find(x => x._id === params.data.subcatcode)?.subcatname: "";
  }

  onEditButtonClick(params: any) {
    this._id = params.data._id;
    this.inserteduser = params.data.inserteduser;
    this.inserteddatetime = params.data.inserteddatetime;
    this.subCatClassiForm.patchValue({
      'classificationname': params.data.classificationname, 
      'status':params.data.status,
      'catcode': params.data.catcode, 
      'subcatcode': params.data.subcatcode,   
    });
  }
  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
		modalRef.componentInstance.details = "SubCategory Classification List";
		modalRef.result.then((data) => {
			if (data == "Yes") {
				this.subcatclassificationManager.deletesub(params.data._id).subscribe((response) => {
					for (let i = 0; i < this.subCatClassification.length; i++) {
						if (this.subCatClassification[i]._id == params.data._id) {
							this.subCatClassification?.splice(i, 1);
							break;
						}
					}
					const selectedRows = params.api.getSelectedRows();
					params.api.applyTransaction({ remove: selectedRows });
					this.gridOptions.api.deselectAll();
					this.calloutService.showSuccess("SubCategory Classification Details Removed Successfully");
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
  onOrderClick(event: any, subCatClassiForm: any) {

    this.markFormGroupTouched(this.subCatClassiForm);
		this.submitted = true;
		if (this.subCatClassiForm.invalid) {
			return;
		}
    
    let subcatclassification001mb = new Subcatclassification001mb();
		subcatclassification001mb.classificationname = this.f.classificationname.value ? this.f.classificationname.value : "";
		subcatclassification001mb.status = this.f.status.value ? this.f.status.value : "";
    subcatclassification001mb.catcode = this.f.catcode.value ? this.f.catcode.value : "";
		subcatclassification001mb.subcatcode = this.f.subcatcode.value ? this.f.subcatcode.value : "";

    if (this._id) {
			subcatclassification001mb._id = this._id;
			subcatclassification001mb.inserteduser = this.inserteduser;
			subcatclassification001mb.inserteddatetime = this.inserteddatetime;
			subcatclassification001mb.updateduser = this.authManager.getcurrentUser.username;
			subcatclassification001mb.updateddatetime = new Date();
			this.subcatclassificationManager.updatesubclasi(subcatclassification001mb).subscribe((response) => {
				this.calloutService.showSuccess("SubCategory Classification Details Updated Successfully");
				this.loadData();
				this.subCatClassiForm.reset();
				this._id = null;
				this.submitted = false;
			});

		}
		else {
			subcatclassification001mb.inserteduser = this.authManager.getcurrentUser.username;
      subcatclassification001mb.inserteddatetime = new Date();
			this.subcatclassificationManager.savesub(subcatclassification001mb).subscribe((response) => {
				this.calloutService.showSuccess("SubCategory Classification Details Saved Successfully");
				this.loadData();
				this.subCatClassiForm.reset();
				this.submitted = false;
			});
		}

  }
  onReset() {
    this.subCatClassiForm.reset();
    this.submitted = false;
  }

 
}


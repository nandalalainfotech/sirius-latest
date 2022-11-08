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
import { SubCategoryManager } from 'src/app/shared/services/restcontroller/bizservice/subcategorymanager.service';
import { Categorydetails001mb } from 'src/app/shared/services/restcontroller/entities/Categorydetails001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/Status001mb';
import { Subcategory001mb } from 'src/app/shared/services/restcontroller/entities/Subcategory001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';


@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})

export class SubcategoryComponent implements OnInit {

  frameworkComponents: any;
  subcatname: string = "";
  subcatstatus: string = "";
  catcode: any;
  public gridOptions: GridOptions | any;
  subCategoryForm: FormGroup | any;
  submitted = false;
  subcatid:number|any; 
  subCategory: Subcategory001mb[] = [];
  subcategory001mb: Subcategory001mb[] = [];
  Categorydetails: Categorydetails001mb[] = [];
  statussets: Status001mb[] =[];
  inserteduser: any;
  inserteddatetime: any;
  _id: any;
  constructor(private subCategoryManager: SubCategoryManager,
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
    
    this.subCategoryForm = this.formBuilder.group({
      catcode:  ['', Validators.required],
      subcatname: ['', Validators.required],
      subcatstatus: ['', Validators.required],
    });

    

    let res0 = this.categoryManager.allcatg();
    let res1 = this.subCategoryManager.allsub();
    let res2 = this.statusSettingManager.allstatus();
  
    forkJoin([res0, res1, res2]).subscribe((data: any) => {
      this.Categorydetails = deserialize<Categorydetails001mb[]>(Categorydetails001mb, data[0]);
      this.subCategory = deserialize<Subcategory001mb[]>(Subcategory001mb, data[1]);
      this.statussets = deserialize<Status001mb[]>(Status001mb, data[2]);
      this.loadData();
    });

    this.categoryManager.allcatg().subscribe((response) => {
      this.Categorydetails = deserialize<Categorydetails001mb[]>(Categorydetails001mb, response);  
    })

    this.statusSettingManager.allstatus().subscribe(response => {
      this.statussets = deserialize<Status001mb[]>(Status001mb, response);
    });


   
  }
 
  loadData() {
    this.subCategoryManager.allsub().subscribe((response) => {
      this.subCategory = deserialize<Subcategory001mb[]>(Subcategory001mb, response);
      if (this.subCategory.length > 0) {
        this.gridOptions?.api?.setRowData(this.subCategory);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    })

  

  }

  get f() { return this.subCategoryForm.controls; }
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
      	field: 'subcatid',
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
        headerName: 'Subscriber Category',
        field: 'subcatname',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },

      {
        headerName: 'Status',
        field: 'subcatstatus',
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
    return params.data.subcatstatus ? this.statussets.find(x => x._id === params.data.subcatstatus)?.name: "";
  }

  setCatname(params: any): string {  
    return params.data.catcode ? this.Categorydetails.find(x => x._id === params.data.catcode)?.catname: "";
  }

  onEditButtonClick(params: any) {
    this._id = params.data._id;
    this.inserteduser = params.data.insertUser;
    this.inserteddatetime = params.data.insertDatetime;
    this.subCategoryForm.patchValue({
      'catcode': params.data.catcode, 
      'subcatname': params.data.subcatname, 
      'subcatstatus': params.data.subcatstatus, 
    });
  }


  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
		modalRef.componentInstance.details = "SubCategory List";
		modalRef.result.then((data) => {
			if (data == "Yes") {
				this.subCategoryManager.deletesub(params.data._id).subscribe((response) => {
					for (let i = 0; i < this.subCategory.length; i++) {
						if (this.subCategory[i]._id == params.data._id) {
							this.subCategory?.splice(i, 1);
							break;
						}
					}
					const selectedRows = params.api.getSelectedRows();
					params.api.applyTransaction({ remove: selectedRows });
					this.gridOptions.api.deselectAll();
					this.calloutService.showSuccess("SubCategory Details Removed Successfully");
				});
			}
		})
  }

  onAuditButtonClick(params: any) {
    console.log("params", params.data);
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "SubCategory";
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
  onOrderClick(event: any, subCategoryForm: any) {
    
    this.markFormGroupTouched(this.subCategoryForm);
		this.submitted = true;
		if (this.subCategoryForm.invalid) {     
			return;
		}
    
    let subcategory001mb = new Subcategory001mb();    

    subcategory001mb.catcode = this.f.catcode.value ? this.f.catcode.value : "";
		subcategory001mb.subcatname = this.f.subcatname.value ? this.f.subcatname.value : "";
		subcategory001mb.subcatstatus = this.f.subcatstatus.value ? this.f.subcatstatus.value : "";

    

    if (this._id) {
			subcategory001mb._id = this._id;
			subcategory001mb.inserteduser = this.inserteduser;
			subcategory001mb.inserteddatetime = this.inserteddatetime;
			subcategory001mb.updateduser = this.authManager.getcurrentUser.username;
			subcategory001mb.updateddatetime = new Date();
      console.log("subcategory001mb", subcategory001mb);
			this.subCategoryManager.updatesub(subcategory001mb).subscribe((response) => {
				this.calloutService.showSuccess("SubCategory Details Updated Successfully");
				this.loadData();
				this.subCategoryForm.reset();
				this._id = null;
				this.submitted = false;
			});

		}
		else {
			subcategory001mb.inserteduser = this.authManager.getcurrentUser.username;
      subcategory001mb.inserteddatetime = new Date();      
      
			this.subCategoryManager.savesub(subcategory001mb).subscribe((response) => {
				this.calloutService.showSuccess("SubCategory Details Saved Successfully");
				this.loadData();
				this.subCategoryForm.reset();
				this.submitted = false;
			});
		}
    
  }
  onReset() {
    this.subCategoryForm.reset();
    this.submitted = false;
  }

 
}
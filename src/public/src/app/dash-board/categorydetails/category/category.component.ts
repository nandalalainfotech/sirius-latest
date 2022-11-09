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
import { Categorydetails001mb } from 'src/app/shared/services/restcontroller/entities/Categorydetails001mb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/Status001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  frameworkComponents: any;
  catname: string = "";
  status: string = "";
  public gridOptions: GridOptions | any;
  CategoryForm: FormGroup | any;
  submitted = false;
  Categorydetails: Categorydetails001mb[] = [];
  inserteduser: any;
  inserteddatetime: any;
  _id: any;
  catid:number|any;
  statussets: Status001mb[] =[];
  constructor(private categoryManager: CategoryManager,
    private statusSettingManager: StatusSettingManager,
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

    this.CategoryForm = this.formBuilder.group({
      catname: ['', Validators.required],
      status: ['', Validators.required]
    });


    let res0 = this.categoryManager.allcatg();
    let res1 = this.statusSettingManager.allstatus();
  
    forkJoin([res0, res1]).subscribe((data: any) => {
      this.Categorydetails = deserialize<Categorydetails001mb[]>(Categorydetails001mb, data[0]);
      this.statussets = deserialize<Status001mb[]>(Status001mb, data[1]);
      this.loadData();
    });
  
  }

  loadData() {
    this.categoryManager.allcatg().subscribe((response) => {
      this.Categorydetails = deserialize<Categorydetails001mb[]>(Categorydetails001mb, response);
      
      if (this.Categorydetails.length > 0) {
        this.gridOptions?.api?.setRowData(this.Categorydetails);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

    this.statusSettingManager.allstatus().subscribe(response => {
      this.statussets = deserialize<Status001mb[]>(Status001mb, response);
    });
  }
  get f() { return this.CategoryForm.controls; }
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
      	field: 'catid',
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
        field: 'catname',
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
    this.CategoryForm.patchValue({
      'catname': params.data.catname, 
      'status':params.data.status     
    });
  }
  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
		modalRef.componentInstance.details = "Category List";
		modalRef.result.then((data) => {
      
			if (data == "Yes") {

   
				this.categoryManager.deletecatg(params.data._id).subscribe((response) => {
					for (let i = 0; i < this.Categorydetails.length; i++) {
						if (this.Categorydetails[i]._id == params.data._id) {
							this.Categorydetails?.splice(i, 1);
							break;
						}
					}
					const selectedRows = params.api.getSelectedRows();
					params.api.applyTransaction({ remove: selectedRows });
					this.gridOptions.api.deselectAll();
					this.calloutService.showSuccess("Category Details Removed Successfully");
				});
			}
		})
  }

  onAuditButtonClick(params: any) {
    console.log("params", params.data);
    
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Category";
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
  onOrderClick(event: any, CategoryForm: any) {      

    this.markFormGroupTouched(this.CategoryForm);
		this.submitted = true;
		if (this.CategoryForm.invalid) {
			return;
		}
    
    let categorydetails001mb = new Categorydetails001mb();
    
		categorydetails001mb.catname = this.f.catname.value ? this.f.catname.value : "";
		categorydetails001mb.status = this.f.status.value ? this.f.status.value : "";

    if (this._id) {
			categorydetails001mb._id = this._id;
			categorydetails001mb.inserteduser = this.inserteduser;
			categorydetails001mb.inserteddatetime = this.inserteddatetime;
			categorydetails001mb.updateduser = this.authManager.getcurrentUser.username;
			categorydetails001mb.updateddatetime = new Date();
			this.categoryManager.updatecatg(categorydetails001mb).subscribe((response) => {
				this.calloutService.showSuccess("Category Details Updated Successfully");
				this.loadData();
				this.CategoryForm.reset();
				this._id = null;
				this.submitted = false;
			});

		}
		else {
			categorydetails001mb.inserteduser = this.authManager.getcurrentUser.username;
      categorydetails001mb.inserteddatetime = new Date();
			this.categoryManager.savesub(categorydetails001mb).subscribe((response) => {
				this.calloutService.showSuccess("Category Details Saved Successfully");
				this.loadData();
				this.CategoryForm.reset();
				this.submitted = false;
			});
		}

		
		
		
  }
  onReset() {
    this.CategoryForm.reset();
    this.submitted = false;
  }

  
}
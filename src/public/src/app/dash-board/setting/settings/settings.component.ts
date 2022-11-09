
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
import { PersonManager } from 'src/app/shared/services/restcontroller/bizservice/person.service';
import { RoleManager } from 'src/app/shared/services/restcontroller/bizservice/role.service';
import { StatusSettingManager } from 'src/app/shared/services/restcontroller/bizservice/status-master.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { Person001mb } from 'src/app/shared/services/restcontroller/entities/Person001mb';
import { Role001wb } from 'src/app/shared/services/restcontroller/entities/Role001wb';
import { Status001mb } from 'src/app/shared/services/restcontroller/entities/Status001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';


@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
    frameworkComponents: any;
    id: number | any;
    rlid: number | any;
    rolename: string = "";
    status: string = "";
    insertUser: string = "";
    insertDatetime: Date | any;
    roles: Role001wb[] = [];
    user001mbs: Login001mb[] = [];
    public gridOptions: GridOptions | any;
    userRoleForm: FormGroup | any;
    persons: Person001mb[] = [];
    statussets: Status001mb[] =[];
    submitted = false;
    _id: any;
    inserteduser: any;
    inserteddatetime: any;


    constructor(private formBuilder: FormBuilder,
        private roleManager: RoleManager,
        private userManager: UserManager,
        private personManager: PersonManager,
        private calloutService: CalloutService,
        private statusSettingManager: StatusSettingManager,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {

        this.createDataGrid001();

        this.userRoleForm = this.formBuilder.group({
            rlid: ['', Validators.required],
            rolename: ['', Validators.required],
            status: ['', Validators.required]
        });

        let res0 = this.roleManager.allrole();
        let res1 = this.personManager.allperson();
        let res2 = this.statusSettingManager.allstatus();
      
        forkJoin([res0, res1, res2]).subscribe((data: any) => {
          this.roles = deserialize<Role001wb[]>(Role001wb, data[0]);
          this.persons = deserialize<Person001mb[]>(Person001mb, data[1]);
          this.statussets = deserialize<Status001mb[]>(Status001mb, data[2]);
          this.loadData();
        });
    }

    loadData() {
        this.roleManager.allrole().subscribe((response) => {
            
            this.roles = deserialize<Role001wb[]>(Role001wb, response);
            if (this.roles.length > 0) {
                this.gridOptions?.api?.setRowData(this.roles);
            } else {
                this.gridOptions?.api?.setRowData([]);
            }
        });

        this.personManager.allperson().subscribe((response) => {
        this.persons =  deserialize<Person001mb[]>(Person001mb, response);     
                      
        })

        this.statusSettingManager.allstatus().subscribe(response => {
            this.statussets = deserialize<Status001mb[]>(Status001mb, response);
          });
    }

    get f() { return this.userRoleForm.controls; }

    createDataGrid001(): void {
        this.gridOptions = {
            paginationPageSize: 10,
            rowSelection: 'single',
            onFirstDataRendered: this.onFirstDataRendered.bind(this)
        };
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.enableRangeSelection = true;
        this.gridOptions.animateRows = true;
        this.gridOptions.columnDefs = [
            {
                headerName: 'User Name',
                field: 'rlid',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
                valueGetter: this.setUserName.bind(this)
            },
            {
                headerName: 'Role Name ',
                field: 'rolename',
                width: 200,
                flex: 1,
                sortable: true,
                filter: true,
                resizable: true,
                suppressSizeToFit: true,
            },
            {
                headerName: 'Status ',
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
                }
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
                }
            },
            {
                headerName: 'Audit',
                cellRenderer: 'iconRenderer',
                width: 55,
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

    setUserName(params: any): string {
        return params.data.rlid ? this.persons.find(x => x._id === params.data.rlid)?.loginid.username: '';
    }

    setStatusname(params: any): string {  
        return params.data.status ? this.statussets.find(x => x._id === params.data.status)?.name: "";
      }

    onEditButtonClick(params: any) {
        this._id = params.data._id;
        this.inserteduser = params.data.inserteduser;
        this.inserteddatetime = params.data.inserteddatetime;
        this.userRoleForm.patchValue({
            'rlid': params.data.rlid,
            'rolename': params.data.rolename,
            'status': params.data.status,
        });
    }

    onDeleteButtonClick(params: any) {
        const modalRef = this.modalService.open(ConformationComponent);
		modalRef.componentInstance.details = "Roles";
		modalRef.result.then((data) => {
			if (data == "Yes") {
        
				this.roleManager.deleterole(params.data._id).subscribe((response) => {
					for (let i = 0; i < this.roles.length; i++) {
						if (this.roles[i]._id == params.data._id) {
							this.roles?.splice(i, 1);
							break;
						}
					}
					const selectedRows = params.api.getSelectedRows();
					params.api.applyTransaction({ remove: selectedRows });
					this.gridOptions.api.deselectAll();
					this.calloutService.showSuccess("Role Detail Removed Successfully");
				});
			}
		})
    }

    onAuditButtonClick(params: any) {
        const modalRef = this.modalService.open(AuditComponent);
        modalRef.componentInstance.title = "User Roll";
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

    onUserRoleFormClick(event: any, userRoleForm: any) {

        this.markFormGroupTouched(this.userRoleForm);
		this.submitted = true;
		if (this.userRoleForm.invalid) {
			return;
		}
    
         let role001wb = new Role001wb();
    
         role001wb.rlid = this.f.rlid.value ? this.f.rlid.value : "";
         role001wb.rolename = this.f.rolename.value ? this.f.rolename.value : "";
         role001wb.status = this.f.status.value ? this.f.status.value : "";

    if (this._id) {
        role001wb._id = this._id;
        role001wb.inserteduser = this.inserteduser;
        role001wb.inserteddatetime = this.inserteddatetime;
        role001wb.updateduser = this.authManager.getcurrentUser.username;
        role001wb.updateddatetime = new Date();
        console.log("role001wb", role001wb);
		this.roleManager.updaterole(role001wb).subscribe((response) => {
            console.log("response", response);
				this.calloutService.showSuccess("Role Updated Successfully");
				this.loadData();
				this.userRoleForm.reset();
				this._id = null;
				this.submitted = false;
		});

		}
		else {
			role001wb.inserteduser = this.authManager.getcurrentUser.username;
            role001wb.inserteddatetime = new Date();
			this.roleManager.saverole(role001wb).subscribe((response) => {
				this.calloutService.showSuccess("Role Saved Successfully");
				this.loadData();
				this.userRoleForm.reset();
				this.submitted = false;
			});
		}
    }

    onReset() {
        this.userRoleForm.reset();
        this.submitted = false;

    }
}



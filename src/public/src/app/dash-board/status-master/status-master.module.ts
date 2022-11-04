import { CommonModule, DatePipe } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgGridModule } from "ag-grid-angular";
import { StatusMasterRoutingModule } from "./status-master-routing.module";
import { StatusMasterComponent } from "./status-master.component";



@NgModule({
  declarations: [StatusMasterComponent],
  imports: [
    StatusMasterRoutingModule,
    CommonModule,
    FormsModule,
    AgGridModule,
    ReactiveFormsModule,
       
  ],
  providers: [DatePipe],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class StatusMasterModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SubcriberdetailsRoutingModule } from './subcriberdetails-routing.module';
import { SubcriberdetailsComponent } from './subcriberdetails.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriberdetailsManager } from 'src/app/shared/services/restcontroller/bizservice/subscriberdetails.service';
import { PaymentManager } from 'src/app/shared/services/restcontroller/bizservice/payment.service';
import { LoginManager } from 'src/app/shared/services/restcontroller/bizservice/login.service';
import { ContentMasterManager } from 'src/app/shared/services/restcontroller/bizservice/contentmaster.service';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [SubcriberdetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubcriberdetailsRoutingModule,
    AgGridModule,
    CalendarModule,   
  ],
  providers:[
    SubscriberdetailsManager,
    PaymentManager,
    LoginManager,
    DatePipe,
    ContentMasterManager, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SubcriberdetailsModule { }

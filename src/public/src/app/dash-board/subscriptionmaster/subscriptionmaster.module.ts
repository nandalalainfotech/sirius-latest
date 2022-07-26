import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionmasterRoutingModule } from './subscriptionmaster-routing.module';
import { SubscriptionmasterComponent } from './subscriptionmaster.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionmasterManager } from 'src/app/shared/services/restcontroller/bizservice/subscriptionmaster.service';
import { LoginManager } from 'src/app/shared/services/restcontroller/bizservice/login.service';


@NgModule({
  declarations: [
    SubscriptionmasterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SubscriptionmasterRoutingModule,
    AgGridModule,
    ReactiveFormsModule  
  ],
  providers:[
    SubscriptionmasterManager,
    LoginManager 
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SubscriptionmasterModule { }

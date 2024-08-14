import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderHistoryComponent } from '../order-history/order-history.component';
import { PaymentSettlementComponent } from '../payment-settlement/payment-settlement.component';

@NgModule({
  declarations: [OrderHistoryComponent, PaymentSettlementComponent],
  imports: [
    CommonModule
  ]
})
export class ReportModule { }

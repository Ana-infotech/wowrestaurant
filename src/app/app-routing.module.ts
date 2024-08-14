import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderHistoryComponent } from 'src/pages/report/order-history/order-history.component';
import { PaymentSettlementComponent } from 'src/pages/report/payment-settlement/payment-settlement.component';


const routes: Routes = [
  {path: 'report/order-history', component: OrderHistoryComponent},
  {path: 'report/payment-settlement', component: PaymentSettlementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

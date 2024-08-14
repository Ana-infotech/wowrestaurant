import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService {

  getSalePayment (endPoint?: any) {
    return this.get(`${endPoint}`, {});
  }

  uploadSalesFile (endPoint?: any, options?: any) {
    console.log(options, "test");
    return this.post(`${endPoint}`, options);
  }

}

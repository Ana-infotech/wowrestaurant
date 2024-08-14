import { Component, OnInit } from '@angular/core';

import * as Papa from 'papaparse';

import { ReportService } from '../report.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  // constructor() { }

  // ngOnInit() {
  // }

  file: File | null = null;
  fileName: string | null = null;
  uploadedFileData: any;

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reportService.getSalePayment('Sales/GetSalesPayment').subscribe((resData: any) => {
      console.log(resData, "reData");
    });
  }

  onFileChange(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.file = selectedFile;
      this.fileName = selectedFile.name;
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();  // Prevent the default form submission behavior

    if (!this.file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const fileContent = e.target.result;

      if (this.file.type === 'text/csv') {
        this.processCSV(fileContent);
      } else if (this.file.type.includes('spreadsheetml.sheet') || this.file.name.endsWith('.xls')) {
        this.processExcel(fileContent);
      }
    };

    if (this.file) {
      if (this.file.type === 'text/csv') {
        fileReader.readAsText(this.file);
      } else {
        fileReader.readAsBinaryString(this.file);
      }
    }
    setTimeout(() => {
      this.reportService.uploadSalesFile("Sales/UploadSalesOrder", {params: this.uploadedFileData}).subscribe((res) => {
        console.log(res, "res");
      });
    }, 1000);
    
  }

  processCSV(csvData: string) {
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        const dataArray = results.data;
        this.uploadedFileData = dataArray.map(this.transformKeys);
      },
      error: (error: any) => {
        console.error('Error parsing CSV:', error);
      }
    });
  }

  transformKeys(obj: any): any {
    const keyMapping: { [key: string]: string } = {
      'Restaurant ID': 'restaurant_id',
      'Restaurant name': 'restaurant_name',
      'Subzone': 'subzone',
      'City': 'city',
      'Order ID': 'order_id',
      'Order Placed At': 'order_placed_at',
      'Order Status': 'order_status',
      'Delivery': 'delivery',
      'Items in order': 'items_in_order',
      'Instructions': 'instructions',
      'Discount construct': 'discount_construct',
      'Bill subtotal': 'bill_subtotal',
      'Packaging charges': 'packaging_charges',
      'Restaurant discount (Promo)': 'restaurant_discount_promo',
      'Restaurant discount (Flat offs, Freebies & others)': 'restaurant_discount_flat_offs',
      'Gold discount': 'gold_discount',
      'Total': 'total',
      'Rating': 'rating',
      'Review': 'review',
      'Cancellation / Rejection reason': 'cancellation_reason',
      'Restaurant compensation (Cancellation)': 'restaurant_compensation',
      'Restaurant penalty (Rejection)': 'restaurant_penalty',
      'KPT duration (minutes)': 'kpt_duration',
      'Rider wait time (minutes)': 'rider_wait_time',
      'Order Ready Marked': 'order_ready_marked',
      'Customer complaint tag': 'customer_complaint_tag',
      'Customer ID': 'customer_id'
    };

    const transformed: { [key: string]: any } = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = keyMapping[key] || key.replace(/ /g, '_');
        transformed[newKey] = obj[key];
      }
    }
    return transformed;
  }


  processExcel(data: string) {
    // const workbook = XLSX.read(data, { type: 'binary' });
    // const sheetName = workbook.SheetNames[0];
    // const sheet = workbook.Sheets[sheetName];
    // const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    // console.log('Parsed Excel Data: ', parsedData);
  }

}

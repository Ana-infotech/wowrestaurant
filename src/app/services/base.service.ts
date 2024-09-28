import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiUrl;

  // Common headers
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  // Method to handle headers
  private getHeaders(customHeaders?: HttpHeaders): HttpHeaders {
    if (customHeaders) {
      return customHeaders.keys().reduce(
        (headers, key) => headers.set(key, customHeaders.get(key)!), 
        this.defaultHeaders
      );
    }
    return this.defaultHeaders;
  }

  // Common GET method
  protected get(url: string, options: { headers?: HttpHeaders; params?: HttpParams } = {}) {
    console.log(options, "options");
    options = {
      ...(options || {}),
      headers: this.getHeaders(options.headers)
    };
    return this.http.get(`${this.baseUrl}/${url}`, options);
  }

  // Common POST method
  protected post(url: string, body: any, options: { headers?: HttpHeaders } = {}) {
    options = {
      ...(options || {}),
      headers: this.getHeaders(options.headers)
    };    
    return this.http.post(`${this.baseUrl}/${url}`, body, options);
  }

  // Common PUT method
  protected put(url: string, body: any, options: { headers?: HttpHeaders; params?: HttpParams } = {}) {
    options = {
      ...(options || {}),
      headers: this.getHeaders(options.headers)
    };
    return this.http.put(`${this.baseUrl}/${url}`, body, options);
  }

  // Common DELETE method
  protected delete(url: string, options: { headers?: HttpHeaders; params?: HttpParams } = {}) {
    options = {
      ...(options || {}),
      headers: this.getHeaders(options.headers)
    };
    return this.http.delete(`${this.baseUrl}/${url}`, options);
  }
}

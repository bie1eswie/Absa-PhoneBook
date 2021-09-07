import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  public pageSize: number;
  public baseUri: string;
  constructor(public httpClient: HttpClient) {
  }
  set(baseUri: string, pageSize?: number): void {
    this.baseUri = baseUri;
    this.pageSize = pageSize;
  }
  get(): Observable<any[]> {
    const uri = this.baseUri;
   // const httpOptions = { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'http://localhost:4200/' }) };
    return this.httpClient.get<any[]>(uri);
  }
  post(data?: any, mapJson: boolean = true): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<any>(this.baseUri, data, httpOptions);
  }
  put(data?: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.put<any>(this.baseUri, data, httpOptions);
  }
  delete(): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.delete<number>(this.baseUri, httpOptions);
  }
}

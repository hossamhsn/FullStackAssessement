import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  //readonly apiUrl = 'http://localhost:5001/api/';
  readonly apiUrl = 'http://localhost:5003/'; //gateway api

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) { }

  // Employee
  getEmployeeList(): Observable<any[]> {
    const httpOptions =this.addHeaderOptions()
    return this.http.get<any[]>(this.apiUrl + 'employee/GetEmployee',httpOptions);
  }

  addEmployee(emp: any): Observable<any> {
    const httpOptions =this.addHeaderOptions()
    return this.http.post<any>(this.apiUrl + 'employee/AddEmployee', emp, httpOptions);
  }

  updateEmployee(emp: any): Observable<any> {
    const  httpOptions =this.addHeaderOptions()
    return this.http.put<any>(this.apiUrl + 'employee/UpdateEmployee/', emp, httpOptions);
  }

  deleteEmployee(id: number): Observable<any> {
    const httpOptions =this.addHeaderOptions()
    return this.http.delete<any>(this.apiUrl + 'employee/DeleteEmployee?id=' + id, httpOptions);
  }
  addHeaderOptions(){
       //TODO: using interceptor
       var auth_token = this.getToken();
       const httpOptions = { headers: new HttpHeaders({
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${auth_token}`
      }) };
      return httpOptions;
  }
   getToken() {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return token;
    }
    return null;
  }
}



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/data';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<string>(this.apiUrl);
  }

  saveData(value: any): Observable<any> {
    const url = `${this.apiUrl}/1`;
    return this.http.put<any>(url, {data: value});  }
}
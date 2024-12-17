import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExcuselistService {

  private url: string = 'http://localhost:3000';
  constructor( private http: HttpClient) {}
    
    getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/listaexcusas`);
  }

  createProducts<T>(product: T): Observable<any[T]> {
    return this.http.post<T>(`${this.url}/listaexcusas`, product);
  }

  }


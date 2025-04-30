import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface City {
  id: string;
  name: string;
  stateId: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = 'http://localhost:3000/cities';

  constructor(private http: HttpClient) {}

  getAll(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }

  getOne(id: string): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/${id}`);
  }

  create(city: Omit<City, 'id' | 'createdAt' | 'updatedAt'>): Observable<City> {
    return this.http.post<City>(this.apiUrl, city);
  }

  update(id: string, city: Partial<City>): Observable<City> {
    return this.http.patch<City>(`${this.apiUrl}/${id}`, city);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Unit {
  id?: number;
  name: string;
  symbol: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class UnitService {
  private api = '/api/units';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.api);
  }

  getOne(id: number): Observable<Unit> {
    return this.http.get<Unit>(`${this.api}/${id}`);
  }

  create(data: Unit): Observable<Unit> {
    return this.http.post<Unit>(this.api, data);
  }

  update(id: number, data: Unit): Observable<Unit> {
    return this.http.patch<Unit>(`${this.api}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

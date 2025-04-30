import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unit } from './unit';

export interface Material {
  id: string;
  code: string;
  name: string;
  description: string;
  unitId: string;
  price: number;
  unit?: Unit;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateMaterialDto {
  code: string;
  name: string;
  description: string;
  unitId: string;
  price: number;
}

export interface UpdateMaterialDto {
  code?: string;
  name?: string;
  description?: string;
  unitId?: string;
  price?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = `http://localhost:3000/materials`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl);
  }

  getOne(id: string): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/${id}`);
  }

  getByCode(code: string): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/code/${code}`);
  }

  create(material: CreateMaterialDto): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material);
  }

  update(id: string, material: UpdateMaterialDto): Observable<Material> {
    return this.http.patch<Material>(`${this.apiUrl}/${id}`, material);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

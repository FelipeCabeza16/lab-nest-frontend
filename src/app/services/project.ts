import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProjectDto {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface UpdateProjectDto {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `http://localhost:3000/projects`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getOne(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  create(project: CreateProjectDto): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  update(id: string, project: UpdateProjectDto): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/${id}`, project);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Project, ProjectService } from '../../../services/project';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAll().subscribe({
      next: (data) => {
        console.log('Projects received:', data);
        this.projects = data;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  deleteProject(id: string): void {
    if (confirm('¿Está seguro de eliminar este proyecto?')) {
      this.projectService.delete(id).subscribe(() => {
        this.projects = this.projects.filter(p => p.id !== id);
      });
    }
  }
}

import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  imports: [
    MatIconModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(public router: Router) {}

  isPath(path: string): boolean {
    return this.router.url === path || this.router.url.includes(path);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAddUsersComponent } from '../modal-add-users/modal-add-users.component';
import {MatIconModule} from '@angular/material/icon';
import { DashboardService } from './dashboard.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { ModalEditUserComponent } from '../modal-edit-user/modal-edit-user.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatIconModule,
    ModalAddUsersComponent,
    ModalEditUserComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  isModalOpen: boolean = false;
  selectedUserId: string = '';
  isModalEditOpen: boolean = false;
  ModalRole: boolean = false;
  users?: Observable<User[]>;

  constructor(private dashboardService: DashboardService) {
    
  }
  ngOnInit(): void {
    this.getAllUsers()
    
  }
  getAllUsers(): void {
    this.users = this.dashboardService.getAllUsers()
  }
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  openEditModal(userId: string) {
    this.selectedUserId = userId;
    this.isModalEditOpen = true;
  }
  closeEditModal() {
    this.isModalEditOpen = false;
  }

  onDelete(userId: string): void{
    this.dashboardService.deleteUser(userId)
    .subscribe({
      next: (response) => {
        this.getAllUsers()
        console.log('Delete successful!')
      }
    })
  }
  
}

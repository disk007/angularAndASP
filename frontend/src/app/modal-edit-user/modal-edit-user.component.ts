import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../models/user.model';
import { ModalEditUserService } from './modal-edit-use.service';
import { FormControl, FormGroup, ReactiveFormsModule,AbstractControl , Validators, FormsModule } from '@angular/forms';
import { EditUserReq } from '../models/edit-user-req.model';

@Component({
  selector: 'app-modal-edit-user',
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './modal-edit-user.component.html',
  styleUrl: './modal-edit-user.component.css'
})
export class ModalEditUserComponent implements OnChanges{

  @Output() close = new EventEmitter<void>();
  @Output() refreshUser = new EventEmitter<void>();
  @Input() userId!: string;
  @ViewChild('dropdownRef') dropdownRef!: ElementRef;
  ModalRole: boolean = false;
  user?: User;
  model?:EditUserReq
  editUser!: FormGroup;
  valueRole: string = '';
  roles: string[] = ['Super Admin', 'Admin', 'Employee'];

  constructor(private EditUserService: ModalEditUserService){

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] && changes['userId'].currentValue) {
      this.getById(changes['userId'].currentValue);
    }
  }
  onSuccess() {
    this.refreshUser.emit(); // ส่งสัญญาณให้ parent รีโหลดข้อมูล
  }
  getById(id: string) {
    this.EditUserService.getUserById(id)
    .subscribe({
      next: (response) => {
        this.user = response;
        this.editUser = this.buildForm(this.user);
        this.valueRole = String(this.user.role.roleName);
      }
    })
  }

  buildForm(user: User): FormGroup {
    return new FormGroup({
      userId: new FormControl(user.userId, [Validators.required]),
      fristname: new FormControl(user.fristname, [Validators.required, Validators.pattern('^[a-zA-Zก-๙]+$')]),
      lastname: new FormControl(user.lastname, [Validators.required, Validators.pattern('^[a-zA-Zก-๙]+$')]),
      email: new FormControl(user.email, [Validators.required, Validators.email]),
      phone: new FormControl(user.phone, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      role: new FormControl(user.role.roleName, [Validators.required]),
      username: new FormControl(user.username, [Validators.required])
    });
  }
   handleClose() {
    this.close.emit(); 
  }
  openRole(){
    this.ModalRole = true;
  }
  closeRole(){
    this.ModalRole = false;
  }
  selectRole(role: string) {
    this.editUser.get('role')?.setValue(role);
    this.valueRole = role;
    this.ModalRole = false;
  }
  onFormSubmit(){
    if (this.editUser.valid) {
      const role = this.editUser.get('role')?.value;
      console.log('Form Submitted:', this.editUser.value);
      this.model = {
        fristname: this.editUser.get('fristname')?.value,
        lastname: this.editUser.get('lastname')?.value,
        email: this.editUser.get('email')?.value,
        phone: this.editUser.get('phone')?.value,
        roleId: role === 'Super Admin' ? '1' : role === 'Admin' ? '2' : '3',
        username: this.editUser.get('username')?.value,
      }
      console.log('Model:', this.model);
      this.EditUserService.updateUser(this.userId,this.model)
      .subscribe({
        next: (response) => {
          this.onSuccess()
          console.log('This was successful!')
          this.handleClose();
        }
      });
    } else {
      this.editUser.markAllAsTouched();
    }
  }
}

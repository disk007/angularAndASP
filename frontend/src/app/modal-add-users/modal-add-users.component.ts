import { Component, EventEmitter, Output, HostListener, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { AddUserReq } from '../models/add-user-req.model';
import { FormControl, FormGroup, ReactiveFormsModule,AbstractControl , Validators, FormsModule } from '@angular/forms';
import { ModalAddUserService } from './modal-add-user.services';

@Component({
  selector: 'app-modal-add-users',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './modal-add-users.component.html',
  styleUrl: './modal-add-users.component.css'
})
export class ModalAddUsersComponent {
  model?: AddUserReq;
  addUser!: FormGroup;
  valueRole: string = '';
  roles: string[] = ['Super Admin', 'Admin', 'Employee'];
  @Output() close = new EventEmitter<void>();
  @ViewChild('dropdownRef') dropdownRef!: ElementRef;
  @Output() refreshUser = new EventEmitter<void>();
  ModalRole: boolean = false;

  constructor(private addUserService: ModalAddUserService) {}
  ngOnInit(): void {
    this.addUser = new FormGroup({
      userId: new FormControl("", [Validators.required]),
      firstname: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Zก-๙]+$')]),
      lastname: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Zก-๙]+$')]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      role: new FormControl("", [Validators.required]),
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(5)]),
      cPassword: new FormControl("", [Validators.required]),
    }, { validators: this.passwordsMatch.bind(this) }); // อย่าลืม bind!
  }
  passwordsMatch(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('cPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }
  onSuccess() {
    this.refreshUser.emit(); // ส่งสัญญาณให้ parent รีโหลดข้อมูล
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
    this.addUser.get('role')?.setValue(role);
    this.valueRole = role;
    this.ModalRole = false;
  }
  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement) {
    if (this.ModalRole && this.dropdownRef && !this.dropdownRef.nativeElement.contains(target)) {
      this.closeRole()
    }
  }
  onFormSubmit(){
    if (this.addUser.valid) {
      const role = this.addUser.get('role')?.value;
      console.log('Form Submitted:', this.addUser.value);
      this.model = {
        userId: this.addUser.get('userId')?.value,
        fristname: this.addUser.get('firstname')?.value,
        lastname: this.addUser.get('lastname')?.value,
        email: this.addUser.get('email')?.value,
        phone: this.addUser.get('phone')?.value,
        roleId: role === 'Super Admin' ? '1' : role === 'Admin' ? '2' : '3',
        username: this.addUser.get('username')?.value,
        password: this.addUser.get('password')?.value,
      }
      console.log('Model:', this.model);
      this.addUserService.addUser(this.model)
      .subscribe({
        next: (response) => {
          this.onSuccess();
          console.log('This was successful!')
          this.handleClose();
        }
      });
      
    } else {
      this.addUser.markAllAsTouched();
    }
  }
}

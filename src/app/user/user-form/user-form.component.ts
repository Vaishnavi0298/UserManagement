import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  public userForm: FormGroup;
  public profileImage: File | null = null;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public errors: any = {}; 


  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router) {
  
  this.userForm = this.fb.group({
    name: [
      '', 
      [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/), 
        Validators.maxLength(30), 
        Validators.minLength(3)
      ]
    ],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    gender: ['', Validators.required],
    dob: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.matchPasswords });

  this.trackFieldErrors();
}
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  validateAge(control: any) {
    const birthDate = new Date(control.value);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age >= 18 ? null : { ageInvalid: true };
  }

  trackFieldErrors() {
    Object.keys(this.userForm.controls).forEach(field => {
      this.userForm.get(field)?.valueChanges.subscribe(() => {
        this.errors[field] = this.getFieldError(field);
      });
    });

    this.userForm.statusChanges.subscribe(() => {
      this.errors['passwordMismatch'] = this.userForm.hasError('passwordMismatch');
    });
  }
  getFieldError(field: string): string | null {
    const control = this.userForm.get(field);
    if (control?.invalid && control?.dirty) {
      if (control.errors?.['required']) return `${field} is required.`;
      if (control.errors?.['email']) return `Enter a valid email.`;
      if (control.errors?.['pattern']) {
        if (field === 'name') return `Name should only contain letters and spaces.`;
        if (field === 'mobile') return `Enter a valid 10-digit mobile number.`;
      }
      if (control.errors?.['minlength']) {
        if (field === 'name') return `Name must be at least 3 characters.`; 
        return `Minimum ${control.errors['minlength'].requiredLength} characters required.`;
    }
      if (control.errors?.['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} characters required.`;
      if (control.errors?.['maxlength']) return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed.`;
    }
    return null;
  }
 
  matchPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
  
    if (!confirmPassword) {
      return { confirmPasswordRequired: true }; 
    }
  
    if (password !== confirmPassword) {
      return { passwordMismatch: true }; 
    }
  
    return null;
  }
  
  onFileSelected(event: any) {
    this.profileImage = event.target.files[0];
  }
 
  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched(); 
      return;
    }
    const userData = this.userForm.value;
    this.userService.registerUser(userData); 
    this.router.navigate(['/users']); 
  }
  
}

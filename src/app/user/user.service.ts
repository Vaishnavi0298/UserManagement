import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.loadUsers();
    }
  }

  private loadUsers() {
    if (this.isBrowser) {
      const storedUsers = localStorage.getItem('users');
      this.users = storedUsers ? JSON.parse(storedUsers) : [];
    }
  }

  private saveUsers() {
    if (this.isBrowser) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  addUser(user: any) {
    this.users.push(user);
    this.saveUsers();
  }

  getUsers() {
    return this.users;
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.saveUsers();
  }

  registerUser(userData: any): void {
    this.addUser(userData);
    alert('User registered successfully!');
  }

  
}

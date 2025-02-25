import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  showDeleteDialog = false;
  selectedUserIndex:any = null;
  showToast: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users = this.userService.getUsers(); 
  }

  openDeleteDialog(index: number) {
    this.selectedUserIndex = index;
    this.showDeleteDialog = true;
  }

 
  closeDialog() {
    this.showDeleteDialog = false;
    this.selectedUserIndex = null;
  }

  deleteUser() {
    if (this.selectedUserIndex !== null) {
     this.userService.deleteUser(this.selectedUserIndex); 
     this.closeDialog();
    this.showToastMessage();
    }
  }


  showToastMessage() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 2000);
  }
}

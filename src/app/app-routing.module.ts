// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   { path: '', redirectTo: 'register', pathMatch: 'full' }, // Redirect to the form
//   { path: 'register', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { UserFormComponent } from './user/user-form/user-form.component';
// import { UserListComponent } from './user/user-list/user-list.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/users', pathMatch: 'full' },
//   { path: 'users', component: UserListComponent },
//   { path: 'register', component: UserFormComponent }, // ✅ Route for Register form
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' }, // Redirect root to /users
  { path: 'users', component: UserListComponent }, // Show UserListComponent by default
  // { path: 'register', component: UserFormComponent }, // Route for registration form
  { path: 'register', loadChildren: () => import('./user/user-form/user-form.module').then(m => m.UserFormModule) } // Lazy load Register
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

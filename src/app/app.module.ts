import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule, // Make sure UserModule is imported
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', // Position of the toast
      preventDuplicates: true, // Prevent duplicate toasts
      timeOut: 3000 // Auto-close after 3 seconds
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

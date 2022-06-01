import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Account-component
import { AccountComponent } from './component/account-component/account/account.component';

import { AddcoursesComponent } from './component/account-component/addcourses/addcourses.component';
import { MycoursesComponent } from './component/account-component/mycourses/mycourses.component';
import { SidebarComponent } from './component/account-component/sidebar/sidebar.component';
//admin
import { UsersComponent } from './component/admin/users/users.component';
import { ValidateAccountComponent } from './component/admin/validate-account/validate-account.component';
//maincomponent
import { CoursesComponent } from './component/main-component/courses/courses.component';
import { HomepageComponent } from './component/main-component/homepage/homepage.component';
import { LoginComponent } from './component/main-component/login/login.component';
import { NavbarComponent } from './component/main-component/navbar/navbar.component';
import { SignUpComponent } from './component/main-component/sign-up/sign-up.component';
import { AddpermanentcoursesComponent } from './component/account-component/addpermanentcourses/addpermanentcourses.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
//Account-component
    AccountComponent,
    AddpermanentcoursesComponent,
    AddcoursesComponent,
    MycoursesComponent,
    SidebarComponent,
//admin
    UsersComponent,
    ValidateAccountComponent,
//maincomponent
    CoursesComponent,
    HomepageComponent,
    LoginComponent,
    NavbarComponent,
    SignUpComponent,
    AddpermanentcoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

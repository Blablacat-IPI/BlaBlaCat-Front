import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Account-component
import { AccountComponent } from './component/account-component/account/account.component';
import { AccountmodifyComponent } from './component/account-component/accountmodify/accountmodify.component';
import { AddcoursesComponent } from './component/account-component/addcourses/addcourses.component';
import { DatausersComponent } from './component/account-component/datausers/datausers.component';
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

const routes: Routes = [
  //Account-component
  { path: 'account', component: AccountComponent},
  { path: 'accountmodify', component: AccountmodifyComponent},
  { path: 'addcourses', component: AddcoursesComponent},
  { path: 'datausers', component: DatausersComponent},
  { path: 'mycourses', component: MycoursesComponent},
  { path: 'sidebar', component: SidebarComponent},
  //admin 
  { path: 'users', component: UsersComponent},
  { path: 'valideaccount', component: ValidateAccountComponent},
  //maincomponent
  { path: 'courses', component: CoursesComponent},
  { path: 'homepage', component: HomepageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'navbar', component: NavbarComponent},
  { path: 'signup', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

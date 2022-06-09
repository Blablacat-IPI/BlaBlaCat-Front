import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.css']
})
export class ValidateAccountComponent implements OnInit {
  register:boolean = false;
  deletion:boolean = false;
  usersList: any;
  users: any;

  page = 0;
  pagemax: any;

  constructor(private us : UsersService) { }

  ngOnInit(): void {
    this.getPageMaxOfUsersNotValidate();
    this.getPage0OfUsersNotValidate();
  }

  getPageMaxOfUsersNotValidate() {
    this.us.getPageMaxOfUsersNotValidateFromService().subscribe(data => {
      this.pagemax = data;
    })
  }

  getPage0OfUsersNotValidate() {
    console.log("Nombre de page max : " + this.pagemax)
    this.page = 0;
    console.log("Page actuelle : " + this.page)
    this.us.getPageOfUsersNotValidateFromService(this.page).subscribe(data => {
      this.usersList = data;
      console.log(this.usersList)
    })
  }

  toPreviousPageOfUsersNotValidate() {
    console.log("Nombre de page max : " + this.pagemax)
    if (this.page > 0) {
      this.page--;
      console.log("Page actuelle : " + this.page)
      this.us.getPageOfUsersNotValidateFromService(this.page).subscribe(data => {
        this.usersList = data;
        console.log(this.usersList)
      })
    } 
  }

  toNextPageOfUsersNotValidate() {
    this.getPageMaxOfUsersNotValidate();
    console.log("Nombre de page max : " + this.pagemax)
    if (this.page < this.pagemax) {
      this.page++;
      console.log("Page actuelle : " + this.page)
      this.us.getPageOfUsersNotValidateFromService(this.page).subscribe(data => {
        this.usersList = data;
        console.log(this.usersList)
      })
    }
  }




  getAccount(){
    this.us.getUnvalidUsersFromService().subscribe(data => {
      this.usersList = data;
    })
    
  }

  getAllUsers() {
    this.us.getUsersFromService().subscribe(data=>{
      this.users = data;
      console.log(this.users);
    })
  }

  deleteUsers(userId: any) {
    this.us.deleteUsersFromService(userId).subscribe(data => {
      this.getAllUsers()
      this.deletion=true;
      setTimeout(() => {
        this.deletion = false;
      }, 2000);
    })
  }

  validateByAdmin(userId:any){
    this.us.setValidateByAdminService(userId).subscribe(() => {
      console.log("Youpi dans component.ts");
      this.getAccount();
      this.register = true;
      setTimeout(() => {
        this.register = false;
      }, 2000);
    })
  }

}

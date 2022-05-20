import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any;
  deletion:boolean = false;
  deletionDouce:boolean = false;

  page = 0;
  pagemax: any;

  constructor(private us : UsersService) { }

  ngOnInit(): void {
    this.getPageMaxOfUsersValidate();
    this.getPage0OfUsersValidate();
  }

  getPageMaxOfUsersValidate() {
    this.us.getPageMaxOfUsersValidateFromService().subscribe(data => {
      this.pagemax = data;
    })
  }  

  getPage0OfUsersValidate() {
    console.log("Nombre de page max : " + this.pagemax)
    this.page = 0;
    console.log("Page actuelle : " + this.page)
    this.us.getPageOfUsersValidateFromService(this.page).subscribe(data => {
      this.users = data;
      console.log(this.users)
    })
  }

  toPreviousPageOfUsersValidate() {
    console.log("Nombre de page max : " + this.pagemax)
    if (this.page > 0) {
      this.page--;
      console.log("Page actuelle : " + this.page)
      this.us.getPageOfUsersValidateFromService(this.page).subscribe(data => {
        this.users = data;
        console.log(this.users)
      })
    } 
  }

  toNextPageOfUsersValidate() {
    this.getPageMaxOfUsersValidate();
    console.log("Nombre de page max : " + this.pagemax)
    if (this.page < this.pagemax) {
      this.page++;
      console.log("Page actuelle : " + this.page)
      this.us.getPageOfUsersValidateFromService(this.page).subscribe(data => {
        this.users = data;
        console.log(this.users)
      })
    }
  }


  getAllUsers() {
    this.us.getUsersFromService().subscribe(data=>{
      this.users = data;
      console.log(this.users);
    })
  }

  getAllValidUsers() {
    this.us.getValidUsersService().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });
  }

  deleteUsers(userId: any) {
    this.us.deleteUsersFromService(userId).subscribe(data => {
      this.getAllValidUsers();
      this.deletion=true;
      setTimeout(() => {
        this.deletion = false;
      }, 2000);
    })

    
  }

  softDeleteUsers(userId: any) {
    this.us.softDeleteUsersFromService(userId).subscribe(data => {
      this.getAllValidUsers();
      this.deletionDouce=true;
      setTimeout(() => {
        this.deletionDouce = false;
      }, 2000);
    })

    
  }


}

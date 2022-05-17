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
  constructor(private us : UsersService) { }

  ngOnInit(): void {
    this.getAccount();
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

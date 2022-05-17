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
  constructor(private us : UsersService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.us.getUsersFromService().subscribe(data=>{
      this.users = data;
      console.log(this.users);
    })
  }

  deleteUsers(userId: any) {
    this.us.deleteUsersFromService(userId).subscribe(data => {
      this.getAllUsers();
      this.deletion=true;
    })
  }

  softDeleteUsers(userId: any) {
    this.us.softDeleteUsersFromService(userId).subscribe(data => {
      this.getAllUsers();
      this.deletionDouce=true;
    })

    
  }


}

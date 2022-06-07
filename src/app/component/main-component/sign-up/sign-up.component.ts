import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userRegister:boolean = false

  constructor(private us: UsersService) { }

  ngOnInit(): void {
  }

  addUsers(user: any) {
    console.log(user.value)
    this.us.addUsersFromService(user.value).subscribe(data => {
      console.log('Users Enregistré');
      this.userRegister = true;
      setTimeout(() => {
        this.userRegister = false;
      }, 2000);
    })
  }

}

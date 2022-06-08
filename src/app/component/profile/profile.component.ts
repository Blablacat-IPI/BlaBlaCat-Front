import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

 id: any;

  constructor(private uService: UsersService) { }

 

  ngOnInit(): void {
  }

  getUserProfile(id: any){
    this.uService.getUserFromService(id).subscribe(data =>{
      this.id = data;
      console.log(this.id);
    })
  }

}

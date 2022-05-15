import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  afficherhomepage:boolean = false
  affichercourses:boolean = false
  affichersignup:boolean = false
  afficherlogin:boolean = false
  afficheraccount:boolean = false

  constructor(private apps: AppService) { }

  ngOnInit(): void {
  }
  
  afficherHomepage() {
    this.afficherhomepage=true;

    this.affichercourses=false;
    this.affichersignup=false;
    this.afficherlogin=false;
    this.afficheraccount=false;
  }

  afficherCourses() {
    this.affichercourses=true;

    this.afficherhomepage=false;
    this.affichersignup=false;
    this.afficherlogin=false;
    this.afficheraccount=false;
  }
  afficherSignup() {
    this.affichersignup=true;

    this.affichercourses=false;
    this.afficherhomepage=false;
    this.afficherlogin=false;
    this.afficheraccount=false;
  }
  afficherLogin() {
    this.afficherlogin=true;

    this.affichercourses=false;
    this.affichersignup=false;
    this.afficherhomepage=false;
    this.afficheraccount=false;
  }
  afficherAccount() {
    this.afficheraccount=true;

    this.affichercourses=false;
    this.affichersignup=false;
    this.afficherlogin=false;
    this.afficherhomepage=false;
  }
}

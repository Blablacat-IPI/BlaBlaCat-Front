import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  afficherhomepage:boolean = false
  affichercourses:boolean = false
  affichersignup:boolean = false
  afficherlogin:boolean = false
  afficheraccount:boolean = false

  constructor() { }

  serviceAfficherHomepage() {
    this.afficherhomepage=true;

    this.affichercourses=false;
    this.affichersignup=false;
    this.afficherlogin=false;
    this.afficheraccount=false;
  }
  serviceafficherCourses() {
    this.affichercourses=true;

    this.afficherhomepage=false;
    this.affichersignup=false;
    this.afficherlogin=false;
    this.afficheraccount=false;
  }
  serviceafficherSignup() {
    this.affichersignup=true;

    this.affichercourses=false;
    this.afficherhomepage=false;
    this.afficherlogin=false;
    this.afficheraccount=false;
  }
  serviceafficherLogin() {
    this.afficherlogin=true;

    this.affichercourses=false;
    this.affichersignup=false;
    this.afficherhomepage=false;
    this.afficheraccount=false;
  }
  serviceafficherAccount() {
    this.afficheraccount=true;

    this.affichercourses=false;
    this.affichersignup=false;
    this.afficherlogin=false;
    this.afficherhomepage=false;
  }
}

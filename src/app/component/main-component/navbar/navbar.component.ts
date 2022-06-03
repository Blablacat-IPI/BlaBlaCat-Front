import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  signuptoggle:boolean = true
  logintoggle:boolean = true
  accounttoggle:boolean = false
  addcoursestoggle:boolean = false
  logouttoggle:boolean = false

  username = ''
  role = ''
  id = ''

  constructor(private cookie: CookieService, private router: Router) { 
    this.username = this.cookie.get('CookieCatUsername')
    this.role = this.cookie.get('CookieCatRole')
    this.id = this.cookie.get('CookieCatId')

    if (this.username != '' && this.role != '' && this.id != ''){
      this.signuptoggle = false
      this.logintoggle = false
      this.accounttoggle = true
      this.addcoursestoggle = true
      this.logouttoggle = true
    }
  }

  ngOnInit(): void {

  }

  logOut() {
    this.cookie.deleteAll();
    setTimeout(() => {
      location.reload()
    }, 100);
    this.router.navigate([""])
  }

  


}

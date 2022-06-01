import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Cookie: any;
  constructor(private router: Router, private service: UsersService, private cookieService: CookieService ) { }

  ngOnInit(): void {
  }

  login(loginForm: any) {
    console.log(loginForm.value);
    this.service.loginService(loginForm.value.email, loginForm.value.password).subscribe(data => {
      console.log(data);
      if (data) {
        this.service.getUserCookieFromService(loginForm.value.email).subscribe(dataCookie => {
          console.log(dataCookie);
          this.Cookie=dataCookie;
          this.cookieService.set('CookieCatUsername', this.Cookie.username, 1)
          this.cookieService.set('CookieCatRole', this.Cookie.role, 1)
          this.cookieService.set('CookieCatId', this.Cookie.id, 1)
          this.router.navigate(['courses'])
          // this.router.navigate(['app'], { skipLocationChange: true}).then(() => {
          //   this.router.navigate(['courses'])
          // })
        })
      }
    })
  }

}

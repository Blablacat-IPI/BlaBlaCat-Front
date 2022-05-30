import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {


  constructor(private http: HttpClient) { }

  //inversion de AbstractControl(object) et ActualUsername(String -> AbstractControl)
  usernameValidator(userControl: string, actualUsername: AbstractControl) {
    console.log('usercontrol : ' + userControl);
    console.log('actualUsername.value : ' + actualUsername.value);

        if(userControl != actualUsername.value){
          
          console.log('1. PAS identique au pseudo actuel');

          

          // this.usernameVacant(actualUsername.value).subscribe(data => {
            
          // })
          
          

          if (!this.usernameVacant(actualUsername.value)) {
            console.log("pseudo déjà pris");
            return false;
          } else {
            console.log("pseudo dispo");
            return null;
          }

        } else {
          console.log('identique au pseudo actuel');
          return null;
        }




  }

  usernameVacant(username: string) {
    return this.http.get('http://localhost:8080/Users/usernameCheckVacant?username=' + username);
  }
}

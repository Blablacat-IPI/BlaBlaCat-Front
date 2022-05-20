import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  //Permet d'obtenir la liste de tous les utilisateurs en général
  getUsersFromService(){
    return this.http.get('http://localhost:8080/Users/all');
  }

  //Permet d'obtenir la liste des users validée
  getValidUsersService(){
    return this.http.get('http://localhost:8080/Users/allValid');
  }

  //Permer d'obtenir la liste des users non validée qui résulte de l'inscription
  getUnvalidUsersFromService(){
    return this.http.get('http://localhost:8080/Users/allUnvalid');
  }
  
  //Résulte l'ajout d'un user après l'inscription
  addUsersFromService(user: any) {
    return this.http.post("http://localhost:8080/Users/addUser", user);
  }

  //Permet de suprimer définitivement un user (cascade non fonctionelle)
  //Sert et FONCTIONNE pour refuser un utilisateur (pour l'admin)
  deleteUsersFromService(idUser: any) {
    return this.http.delete("http://localhost:8080/Users/deleteUser/" + idUser);
  }

  //Permet à l'admin de suprimer un utilisateur, mais ne le suprime pas dans la BDD
  softDeleteUsersFromService(idUser: any) {
    return this.http.delete("http://localhost:8080/Users/softDeleteUser/" + idUser);
  }

  //Permet à l'admin de validé un utilisateur qui vient de s'inscrire, une fois validé
  //il est capable de se co.
  setValidateByAdminService(userId: any) {
    return this.http.post("http://localhost:8080/Users/validateByAdmin/" + userId, {});
    //{} -> post() veut plus de 1 argument, permet de outrepasser
    //ou utiliser un get ?
  }

  // ******************************** Users Not Validate ****************************************

  getPageMaxOfUsersNotValidateFromService() {
    return this.http.get('http://localhost:8080/Users/pageMaxUsersNotValidate')
  }

  getPageOfUsersNotValidateFromService(page: any) {
    return this.http.get('http://localhost:8080/Users/pageUsersNotValidate?page='+page)
  }
  
  // ******************************** Users Validate ****************************************

  getPageMaxOfUsersValidateFromService() {
    return this.http.get('http://localhost:8080/Users/pageMaxUsersValidate')
  }

  getPageOfUsersValidateFromService(page: any) {
    return this.http.get('http://localhost:8080/Users/pageUsersValidate?page='+page)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  //Permet d'obtenir la liste de tous les utilisateurs en général
  getUsersFromService(){
    return this.http.get('https://blablacat.herokuapp.com/Users/all');
  }

  getUserFromService(userId: any){
    return this.http.get('https://blablacat.herokuapp.com/Users/getById?id='+ userId);
  }

  updateProfilService(updateProfil: any){
    return this.http.post('https://blablacat.herokuapp.com/Users/updateUser', updateProfil);
  }

  checkUsernameService(username: any){
    return this.http.get('https://blablacat.herokuapp.com/Users/usernameCheckVacant?username=' + username);
  }

  checkCompanyIdService(companyId: any){
    return this.http.get('https://blablacat.herokuapp.com/Users/companyIdCheckVacant?companyId=' + companyId);
  }

  checkEmailService(email: any){
    return this.http.get('https://blablacat.herokuapp.com/Users/emailCheckVacant?email=' + email);
  }

  loginService(email: any, password: any){
    return this.http.get('https://blablacat.herokuapp.com/Auth/Login?email='+email+'&password='+password);
  }

  getUserCookieFromService(email: any){
    return this.http.get('https://blablacat.herokuapp.com/Auth/Usercookie?email='+email );
  }

  getDriverEmail(driverUsername: string){
    return this.http.get('https://blablacat.herokuapp.com/Users/email/' + driverUsername, {responseType: 'text' });
  }

  //Permet d'obtenir la liste des users validée
  getValidUsersService(){
    return this.http.get('https://blablacat.herokuapp.com/Users/allValid');
  }

  //Permer d'obtenir la liste des users non validée qui résulte de l'inscription
  getUnvalidUsersFromService(){
    return this.http.get('https://blablacat.herokuapp.com/Users/allUnvalid');
  }
  
  //Résulte l'ajout d'un user après l'inscription
  addUsersFromService(user: any) {
    return this.http.post("https://blablacat.herokuapp.com/Users/addUser", user);
  }

  //Permet de suprimer définitivement un user (cascade non fonctionelle)
  //Sert et FONCTIONNE pour refuser un utilisateur (pour l'admin)
  deleteUsersFromService(idUser: any) {
    return this.http.delete("https://blablacat.herokuapp.com/Users/deleteUser/" + idUser);
  }

  //Permet à l'admin de suprimer un utilisateur, mais ne le suprime pas dans la BDD
  softDeleteUsersFromService(idUser: any) {
    return this.http.delete("https://blablacat.herokuapp.com/Users/softDeleteUser/" + idUser);
  }

  //Permet à l'admin de validé un utilisateur qui vient de s'inscrire, une fois validé
  //il est capable de se co.
  setValidateByAdminService(userId: any) {
    return this.http.post("https://blablacat.herokuapp.com/Users/validateByAdmin/" + userId, {});
    //{} -> post() veut plus de 1 argument, permet de outrepasser
    //ou utiliser un get ?
  }

  // ******************************** Users Not Validate ****************************************

  getPageMaxOfUsersNotValidateFromService() {
    return this.http.get('https://blablacat.herokuapp.com/Users/pageMaxUsersNotValidate')
  }

  getPageOfUsersNotValidateFromService(page: any) {
    return this.http.get('https://blablacat.herokuapp.com/Users/pageUsersNotValidate?page='+page)
  }
  
  // ******************************** Users Validate ****************************************

  getPageMaxOfUsersValidateFromService() {
    return this.http.get('https://blablacat.herokuapp.com/Users/pageMaxUsersValidate')
  }

  getPageOfUsersValidateFromService(page: any) {
    return this.http.get('https://blablacat.herokuapp.com/Users/pageUsersValidate?page='+page)
  }
}

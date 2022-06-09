import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  static afficheCroix:boolean = true;

  constructor(private http:HttpClient) { }

  //Récupère tous les trajets de manière général
  getCoursesFromService(){
    return this.http.get('https://blablacat.herokuapp.com/Course/allValid');
  }

  //Récupère les 5 derniers trajets pour la page homepage
  getLastFiveCoursesService(){
    return this.http.get('https://blablacat.herokuapp.com/Course/lastFive');
  }

  //Permet la création d'un trajet
  addCoursesFromService(course: any) {
    return this.http.post("https://blablacat.herokuapp.com/Course/add", course);
  }

  //Permet la création d'un trajet permanent sur une durée voulu
  addPermanentCoursesFromService(permanentCourse: any){
    return this.http.post("https://blablacat.herokuapp.com/Course/addPermanent", permanentCourse);
  }

  //Permet à un utilisateur de s'inscrire à un trajet
  addReservationFromService(newReservation:any){
    return this.http.post('https://blablacat.herokuapp.com/Reservation/add', newReservation);
  }

  //Permer d'obtenir toutes les réservations
  // getMyCoursesFromService() {
  //   return this.http.get('https://blablacat.herokuapp.com/Reservation/all');
  // }
  
  // ********************************* Filtre ************************************ 

  //Filtre par ville
  searchByCityService(city: any) {
    let keyCity = city.value.keyCity;
    return this.http.get('https://blablacat.herokuapp.com/Course/searchcity/' + keyCity)
  }
  searchByStreetService(street: any) {
    let keyStreet = street.value.keyStreet;
    return this.http.get('https://blablacat.herokuapp.com/Course/searchstreet/' + keyStreet)
  }
  searchByZipcodeService(zipcode: any) {
    let keyZipcode = zipcode.value.keyZipcode;
    return this.http.get('https://blablacat.herokuapp.com/Course/searchzipcode/' + keyZipcode)
  }

  // ********************************* MyReservations ************************************  
  getPageOfMyReservationsFromService(page: any, userId: any) {
    return this.http.get('https://blablacat.herokuapp.com/Reservation/Page?page=' + page + '&userId=' + userId)
  }

  getPageMaxReservations(userId: any) {
    return this.http.get('https://blablacat.herokuapp.com/Reservation/pagemax' + userId)
  }

  deleteReservationService(courseId: any, userId: any) {
    return this.http.delete('https://blablacat.herokuapp.com/Reservation/delete/' + courseId +'/'+ userId);
  }

  // ********************************* MyCourses **************************************
  getPageOfMyCoursesFromService(page: any, userId: any) {
    return this.http.get('https://blablacat.herokuapp.com/Course/pageMyCourses?page=' + page + '&userId=' + userId)
  }

  getPageMaxMyCourses(userId: any) {
    return this.http.get('https://blablacat.herokuapp.com/Course/pageMaxMyCourses/' + userId)
  }

  deleteCourseService(courseId: any) {
    return this.http.delete('https://blablacat.herokuapp.com/Course/deleteCourse/' + courseId);
  }

  // ******************************** AllCourses ****************************************
  getPageMaxOfCourses() {
    return this.http.get('https://blablacat.herokuapp.com/Course/pageMaxAllCourses')
  }

  getPageOfCoursesFromService(page: any) {
    return this.http.get('https://blablacat.herokuapp.com/Course/pageAllCourses?page='+ page)
  }

}

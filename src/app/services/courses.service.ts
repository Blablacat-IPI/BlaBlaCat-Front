import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  afficheCroix:boolean = false;

  constructor(private http:HttpClient) { }

  getCoursesFromService(){
    return this.http.get('http://localhost:8080/Course/allValid');
  }

  getLastFiveCoursesService(){
    return this.http.get('http://localhost:8080/Course/lastFive');
  }

  addCoursesFromService(course: any) {
    return this.http.post("http://localhost:8080/Course/add", course);
  }

  addReservationFromService(reservation: any){
    return this.http.post('http://localhost:8080/Reservation/add', reservation);
  }
  
  searchByCityService(city: any) {
    let keyCity = city.value.keyCity;
    return this.http.get('http://localhost:8080/Course/searchcity/' + keyCity)
  }

  getMyCoursesFromService() {
    return this.http.get('http://localhost:8080/Reservation/all');
  }


  // ********************************* MyReservations ************************************  
  getPageOfMyReservationsFromService(page: any) {
    return this.http.get('http://localhost:8080/Reservation/Page?page='+page)
  }

  getPageMaxReservations() {
    return this.http.get('http://localhost:8080/Reservation/pagemax')
  }

  // ********************************* MyCourses **************************************
  getPageOfMyCoursesFromService(page: any) {
    return this.http.get('http://localhost:8080/Course/pageMyCourses?page='+page)
  }

  getPageMaxMyCourses() {
    return this.http.get('http://localhost:8080/Course/pageMaxMyCourses')
  }

}

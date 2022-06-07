import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any;
  afficheRecherche:boolean = false;
  userId: any;

  page = 0;
  pagemax: any;

  textTooltip: any
  role = ''
  test:boolean = false


  constructor(private courseS: CoursesService, private cookie: CookieService) { }

  ngOnInit(): void {
    this.userId = this.cookie.get('CookieCatId');
    this.getPageMaxOfCourses();
    this.getPage0OfCourses();

    this.role = this.cookie.get('CookieCatRole')
    if (this.role == ''){
      this.textTooltip = "Connexion nécessaire pour effectuer cette action !"
    } else {
      this.test = true
    }
  }

  getAllCourses(){
    this.courseS.getCoursesFromService().subscribe(data =>{
      this.courses = data;
      console.log(this.courses);
    })
  }

  addReservation(course:any){
    let reservation: any;
    reservation = {
      course: course,
      userId: this.userId};

    this.courseS.addReservationFromService(reservation).subscribe(data => {
      this.courses.numberPlace - 1;
      console.log("Trajet enregistré" + " " + "Places disponibles");
    })
  }

  afficherRecherche() {
    if (this.afficheRecherche == true) {
      this.afficheRecherche = false;
    } else {
      this.afficheRecherche = true;
    }
  }


  searchByCity(city: any) {
    this.courseS.searchByCityService(city).subscribe(data => {
      console.log("Yoshhhh");
      this.courses = data;
    })
  }

  getPageMaxOfCourses() {
    this.courseS.getPageMaxOfCourses().subscribe(data => {
      this.pagemax = data;
    })
  }

  getPage0OfCourses() {
    console.log("Nombre de page max : " + this.pagemax)
    this.page = 0;
    console.log("Page actuelle : " + this.page)
    this.courseS.getPageOfCoursesFromService(this.page).subscribe(data => {
      this.courses = data;
      console.log(this.courses)
    })
  }

  toPreviousPageOfCourses() {
    console.log("Nombre de page max : " + this.pagemax)
    if (this.page > 0) {
      this.page--;
      console.log("Page actuelle : " + this.page)
      this.courseS.getPageOfCoursesFromService(this.page).subscribe(data => {
        this.courses = data;
        console.log(this.courses)
      })
    } 
  }


  toNextPageOfCourses() {
    this.getPageMaxOfCourses();
    console.log("Nombre de page max : " + this.pagemax)
    if (this.page < this.pagemax) {
      this.page++;
      console.log("Page actuelle : " + this.page)
      this.courseS.getPageOfCoursesFromService(this.page).subscribe(data => {
        this.courses = data;
        console.log(this.courses)
      })
    }
  }



}

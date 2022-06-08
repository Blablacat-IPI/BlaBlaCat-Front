import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MycoursesComponent implements OnInit {
  userId: any;

  //Trajets réservés par l'User
  myReservations: any;
  pageReservations = 0;
  pageMaxReservations: any;

  //trajets créés par l'User
  myCourses: any;
  pageCourses = 0;
  pageMaxCourses: any;

  constructor(private CourseService: CoursesService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.userId = this.cookieService.get('CookieCatId');
    this.initReservations();
    this.initCourses();
  }

  // *******************************Reservations************************************
  initReservations() {
    this.getPageMaxReservations();
    this.getPage0Reservations();
  }


  getPageMaxReservations() {
    this.CourseService.getPageMaxReservations(this.userId).subscribe(data => {
      this.pageMaxReservations = data;
    });
  }

  getPage0Reservations() {
    console.log("Nombre de page max : " + this.pageMaxReservations)
    this.pageReservations = 0;
    console.log("Page actuelle : " + this.pageReservations)
    this.CourseService.getPageOfMyReservationsFromService(this.pageReservations, this.userId).subscribe(data => {
      this.myReservations = data;
    })
  }

  toPreviousPageReservations() {
    console.log("Nombre de page max : " + this.pageMaxReservations)
    if (this.pageReservations > 0) {
      this.pageReservations--;
      console.log("Page actuelle : " + this.pageReservations)
      this.CourseService.getPageOfMyReservationsFromService(this.pageReservations, this.userId).subscribe(data => {
        this.myReservations = data;
      })
    }
  }

  //Faire un loader d'attente
  toNextPageReservations() {
    this.getPageMaxReservations();
    console.log("Nombre de page max : " + this.pageMaxReservations)
    if (this.pageReservations < this.pageMaxReservations) {
      this.pageReservations++;
      console.log("Page actuelle : " + this.pageReservations)
      this.CourseService.getPageOfMyReservationsFromService(this.pageReservations, this.userId).subscribe(data => {
        this.myReservations = data;
      })
    }

  }

  //***********************************trajtes créés************************************
  initCourses() {
    this.getPageMaxCourses();
    this.getPage0Courses();
  }

  deleteCourse(course: any){
    if(confirm("Etes vous sûr de vouloir supprimer ce trajet ?")){
      this.CourseService.deleteCourseService(course.id).subscribe(data => {
        console.log("dans delete course");

        this.initCourses();


      })
    }
  }

  getPageMaxCourses() {
    this.CourseService.getPageMaxMyCourses(this.userId).subscribe(data => {
      this.pageMaxCourses = data;
    });
  }

  getPage0Courses() {
    console.log("Nombre de page max : " + this.pageMaxCourses)
    this.pageCourses = 0;
    console.log("Page actuelle : " + this.pageCourses)
    this.CourseService.getPageOfMyCoursesFromService(this.pageCourses, this.userId).subscribe(data => {
      this.myCourses = data;
      console.log(this.myCourses)
    })
  }

  toPreviousPageCourses() {
    console.log("Nombre de page max : " + this.pageMaxCourses)
    if (this.pageCourses > 0) {
      this.pageCourses--;
      console.log("Page actuelle : " + this.pageCourses)
      this.CourseService.getPageOfMyCoursesFromService(this.pageCourses, this.userId).subscribe(data => {
        this.myCourses = data;
        console.log(this.myCourses)
      })
    }
  }

  //Faire un loader d'attente
  toNextPageCourses() {
    this.getPageMaxCourses();
    console.log("Nombre de page max : " + this.pageMaxCourses)
    if (this.pageCourses < this.pageMaxCourses) {
      this.pageCourses++;
      console.log("Page actuelle : " + this.pageCourses)
      this.CourseService.getPageOfMyCoursesFromService(this.pageCourses, this.userId).subscribe(data => {
        this.myCourses = data;
        console.log(this.myCourses)
      })
    }

  }
}
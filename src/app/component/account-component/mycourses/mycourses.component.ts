import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MycoursesComponent implements OnInit {
  myCourses: any;
  page = 0;
  pagemax: any;

  constructor(private CourseService : CoursesService) { }

  ngOnInit(): void {
    this.getPageMax();
    this.getPage0();
  }

  getPageMax() {
    this.CourseService.getPageMax().subscribe(data => {
      this.pagemax = data;
    });
  }

  getPage0() {
    console.log("Nombre de page max : " + this.pagemax)
    this.page = 0;
    console.log("Page actuelle : " + this.page)
    this.CourseService.getPageOfMyCoursesFromService(this.page).subscribe(data => {
      this.myCourses = data;
      console.log(this.myCourses)
    })
  }

  toPreviousPage() {
    console.log("Nombre de page max : " + this.pagemax)
    if (this.page > 0) {
      this.page--;
      console.log("Page actuelle : " + this.page)
      this.CourseService.getPageOfMyCoursesFromService(this.page).subscribe(data => {
        this.myCourses = data;
        console.log(this.myCourses)
      })
    } 
  }

  //Faire un loader d'attente
  toNextPage() {
    this.getPageMax();
    console.log("Nombre de page max : " + this.pagemax)
    if (this.page < this.pagemax) {
      this.page++;
      console.log("Page actuelle : " + this.page)
      this.CourseService.getPageOfMyCoursesFromService(this.page).subscribe(data => {
        this.myCourses = data;
        console.log(this.myCourses)
      })
    }

  }

}

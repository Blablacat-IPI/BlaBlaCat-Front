import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  lastCourses: any;


  constructor(private courseService : CoursesService) { }

  ngOnInit(): void {
    this.courseService.getLastFiveCoursesService().subscribe(data =>{
      this.lastCourses = data;
      console.log(this.lastCourses);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-addpermanentcourses',
  templateUrl: './addpermanentcourses.component.html',
  styleUrls: ['./addpermanentcourses.component.css']
})
export class AddpermanentcoursesComponent implements OnInit {
  permanentCourseRegister:boolean = false
  ngDropdown = 0;
  today!: String;
  max!: String;

  dateTime!: Date;
  jour!: String;
  mois!: String;
  annee!: String;
  heure!: String;

  constructor(private cs: CoursesService, private cookieService : CookieService) { }

  ngOnInit(): void {
    this.today = this.dateNow();
    this.max = this.dateMax();
  }

  addPermanentCourses(permanentCourse: any) {

    permanentCourse.value.id = this.cookieService.get('CookieCatId');
    console.log(permanentCourse.value);
    this.cs.addPermanentCoursesFromService(permanentCourse.value).subscribe(data => {
      console.log(data)
      this.permanentCourseRegister = true;

      setTimeout(() => {
        this.permanentCourseRegister = false;
      }, 2000);
    })
  }


  //Récupère la date du jour et la transforme en String yyyy:MM:ddTHH:mm pour les valeurs de l'input date
  dateNow(){
    this.dateTime = new Date(Date.now());

    this.jour = this.dateTime.getDay().toString();
    this.mois = this.dateTime.getMonth().toString();
    this.annee = this.dateTime.getFullYear().toString();
    
    return this.annee + "-" + this.mois + "-" + this.jour;
  }

  //Donne la valeur max de l'input Date (aujourd'hui + 2 ans)
  dateMax(){
    this.dateTime = new Date(Date.now());

    this.jour = this.dateTime.getDay().toString();
    this.mois = this.dateTime.getMonth().toString();
    this.annee = this.dateTime.getFullYear().toString();
    this.annee = (+this.annee + 2).toString();
    
    return this.annee + "-" + this.mois + "-" + this.jour;
  }

}

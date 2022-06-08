import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-addcourses',
  templateUrl: './addcourses.component.html',
  styleUrls: ['./addcourses.component.css']
})
export class AddcoursesComponent implements OnInit {

  courseRegister:boolean = false
  //select
  ngDropdown = 0;
  today!: String;
  max!: String;

  dateTime!: Date;
  jour!: String;
  mois!: String;
  annee!: String;
  heure!: String;

  afficheCroix!: Boolean;


  constructor(private cs: CoursesService, private cookieService : CookieService) { }

  ngOnInit(): void {
    this.afficheCroix = CoursesService.afficheCroix;
    this.today = this.dateNow();
    this.max = this.dateMax();

  }

  addCourses(course: any) {
    course.value.id = this.cookieService.get('CookieCatId');
    this.cs.addCoursesFromService(course.value).subscribe(data => {
      console.log('Course enregistré !')
      this.courseRegister = true;
      setTimeout(() => {
        this.courseRegister = false;
      }, 2000);
    })
  }

  //Récupère la date du jour et la transforme en String yyyy:MM:ddTHH:mm pour les valeurs de l'input date
  dateNow(){
    this.dateTime = new Date(Date.now());

    this.jour = this.dateTime.getDay().toString();
    this.mois = this.dateTime.getMonth().toString();
    this.annee = this.dateTime.getFullYear().toString();
    this.heure = this.dateTime.getHours().toString() + ":" + this.dateTime.getMinutes().toString();
    
    return this.annee + "-" + this.mois + "-" + this.jour + "T" + this.heure;
  }

  //Donne la valeur max de l'input Date (aujourd'hui + 2 ans)
  dateMax(){
    this.dateTime = new Date(Date.now());

    //toLocaleString => dd/MM/yyyy, HH:mm:ss
    this.jour = this.dateTime.getDay().toString();
    this.mois = this.dateTime.getMonth().toString();
    this.annee = this.dateTime.getFullYear().toString();
    this.annee = (+this.annee + 2).toString();
    this.heure = this.dateTime.getHours().toString() + ":" + this.dateTime.getMinutes().toString();
    
    return this.annee + "-" + this.mois + "-" + this.jour + "T" + this.heure;
  }

}

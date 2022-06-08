import { Component, OnInit } from '@angular/core';
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

  constructor(private cs: CoursesService) { }

  ngOnInit(): void {
    this.today = this.dateNow();
    this.max = this.dateMax();
  }

  addPermanentCourses(permanentCourse: any) {
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

    //A simplifier avec :https://stackoverflow.com/questions/34546447/bind-an-input-with-type-datetime-local-to-a-date-property-in-angular-2
    //this.mois = this.dateTime.getMonth().toString();

    //toLocaleString => dd/MM/yyyy, HH:mm:ss
    this.jour = this.dateTime.toLocaleString('fr-FR').split('/')[0];//dd
    this.mois = this.dateTime.toLocaleString('fr-FR').split('/')[1];//MM
    this.annee = this.dateTime.toLocaleString('fr-FR').split('/')[2].split(',')[0];//yyyy
    this.heure = this.dateTime.toLocaleString('fr-FR').split(' ')[1].split(":")[0] + ":" + this.dateTime.toLocaleString('fr-FR').split(' ')[1].split(":")[1];
    
    return this.annee + "-" + this.mois + "-" + this.jour + "T" + this.heure;
  }

  //Donne la valeur max de l'input Date (aujourd'hui + 2 ans)
  dateMax(){
    this.dateTime = new Date(Date.now());

    //toLocaleString => dd/MM/yyyy, HH:mm:ss
    this.jour = this.dateTime.toLocaleString('fr-FR').split('/')[0];//dd
    this.mois = this.dateTime.toLocaleString('fr-FR').split('/')[1];//MM
    this.annee = this.dateTime.toLocaleString('fr-FR').split('/')[2].split(',')[0];//yyyy
    this.annee = (+this.annee + 2).toString();
    this.heure = this.dateTime.toLocaleString('fr-FR').split(' ')[1].split(":")[0] + ":" + this.dateTime.toLocaleString('fr-FR').split(' ')[1].split(":")[1];
    
    return this.annee + "-" + this.mois + "-" + this.jour + "T" + this.heure;
  }

}

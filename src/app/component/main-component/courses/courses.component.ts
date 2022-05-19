import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any;
  afficheRecherche:boolean = false;

  constructor(private courseS: CoursesService) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(){
    this.courseS.getCoursesFromService().subscribe(data =>{
      this.courses = data;
      console.log(this.courses);
    })
  }

  addReservation(reservation:any){
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

}

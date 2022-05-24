import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  afficherVa:boolean = false
  afficherU:boolean = false
  afficherAc:boolean = false
  afficherMc:boolean = false
  afficherAPc:boolean = false
  afficherA:boolean = false

  constructor() { }

  ngOnInit(): void {
    CoursesService.afficheCroix = false;
  }

  ngOnDestroy(){
    CoursesService.afficheCroix = true;
  }

  afficherValidateAccount() {
    this.afficherVa=true;
    
    this.afficherAc=false;
    this.afficherU=false;
    this.afficherMc=false;
    this.afficherAPc=false;
    this.afficherA=false;
  }

  afficherUsers() {
    this.afficherU=true;

    this.afficherAc=false;
    this.afficherVa=false;
    this.afficherMc=false;
    this.afficherAPc=false;
    this.afficherA=false;
  }

  afficherAddCourses() {
    this.afficherAc=true;

    this.afficherVa=false;
    this.afficherU=false;
    this.afficherMc=false;
    this.afficherAPc=false;
    this.afficherA=false;
  }

  afficherMyCourses() {
    this.afficherMc=true;

    this.afficherAc=false;
    this.afficherVa=false;
    this.afficherU=false;
    this.afficherAPc=false;
    this.afficherA=false;
  }

  afficherAddPermanentCourses() {
    this.afficherAPc=true;

    this.afficherMc=false;
    this.afficherAc=false;
    this.afficherVa=false;
    this.afficherU=false;
    this.afficherA=false;
  }

  afficherAccount() {
    this.afficherA=true;

    this.afficherAPc=false;
    this.afficherMc=false;
    this.afficherAc=false;
    this.afficherVa=false;
    this.afficherU=false;
  }



}

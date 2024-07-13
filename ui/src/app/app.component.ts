import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AppointmentsComponent } from "./components/appointments/appointments.component";
import { PatientsComponent } from "./components/patients/patients.component";
import { PatientComponent } from "./components/patients/patient/patient.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, ButtonModule, SidenavComponent, DashboardComponent, AppointmentsComponent, PatientsComponent, PatientComponent]
})
export class AppComponent implements OnInit {

  showSideNav: boolean = true;
  title = 'Health-Hub';

  constructor ( private router: Router) {}
  ngOnInit() {
    this.showNav();
  }
  
  showNav(){
    this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
        this.showSideNav = !['/', '/register'].includes(event.urlAfterRedirects);
      }
    });
  }
  

}

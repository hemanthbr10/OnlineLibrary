import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
goTologinComponent() {
  this.router.navigate(['adminlogin']);
}
goToOrderComponent() {
  this.router.navigate(['oderComponent']);
}
goToPublisherComponent() {
  this.router.navigate(['publisherComponent']);
}
goToMemberComponent() {
  this.router.navigate(['memberComponent']);
}
goToHomeComponent() {
  this.router.navigate(['adminHomeComponent']);
}
goToBooksComponent() {
this.router.navigate(['bookComponent']);
}
constructor(private router:Router){}
}

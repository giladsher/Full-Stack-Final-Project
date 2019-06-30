import { Component, OnInit } from '@angular/core'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LogInComponent } from "../log-in/log-in.component";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  localStorage = localStorage;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  openSignUp() {
    this.modalService.open(SignUpComponent);
  }
  openLogIn() {
    this.modalService.open(LogInComponent);
  }
  logOut() {
    localStorage.clear();
    if(document.location.pathname != '/home') document.location.assign('/home');
  }

}

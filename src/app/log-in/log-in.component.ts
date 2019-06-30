import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  messageActive: boolean = false;
  message: object = {type: '', message: ''};
  emailRegEx = /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  formGroup = this.formBuilder.group({
    email: ['',[Validators.required, Validators.pattern(this.emailRegEx)] ],
    password: ['', [Validators.required]],
    remember: []
    });

  constructor(private formBuilder:FormBuilder, public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
    if(localStorage.getItem('remember') == 'false') {
      window.onunload = () => {
        localStorage.clear();
        return '';
      }
    }
  }

  onSubmit() {}

  logIn(email: string, password: string, remember: boolean) {
    const user: Object = {email: email, password: password};
    this.userService.logIn(user).subscribe(res => {
      this.messageActive = true;
      this.message = {type: 'success', message: `Welcome back ${res['username']}!`};
      localStorage.setItem('token', res['token']);
      localStorage.setItem('username', res['username']);
      localStorage.setItem('admin', res['admin']);
      localStorage.setItem('remember', `${remember}`);
      setTimeout(() => this.activeModal.close('success'), 2000);
    }, err => {
      this.messageActive = true;
      this.message = {type: 'warning', message: `${err.error}`};
    });
  }
}

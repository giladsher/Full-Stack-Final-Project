import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder,FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user-service.service';
import { LogInComponent } from '../log-in/log-in.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  messageActive: boolean = false;
  message: object;
  emailRegEx = /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  formGroup = this.formBuilder.group({
    email: ['',[Validators.required, Validators.pattern(this.emailRegEx)] ],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['',[Validators.required]]
    }, {validator: this.checkPasswords });

  constructor(private formBuilder:FormBuilder, public activeModal: NgbActiveModal, private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
  }
  
  onSubmit() {}
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }     
  }

  signUp(email: String, username: String, password: String) {
    const user: Object = {email: email, username: username, password: password};
    this.userService.signUp(user).subscribe(res => {
      this.messageActive = true;
      this.message = {type: 'success', message: `User ${res['username']} was created successfully!`};
      setTimeout(() => {
        this.activeModal.close('success');
        this.modalService.open(LogInComponent);
      }, 3000);
    }, err => {
      this.messageActive = true;
      this.message = {type: 'warning', message: `${err}`};
    });
  }
}

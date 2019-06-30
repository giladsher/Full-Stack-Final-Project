import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  emailRegEx = /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  formGroupContact = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['',[Validators.required,Validators.pattern(this.emailRegEx)] ],
    message: ['']
  });
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  onSubmit(){

  }
}

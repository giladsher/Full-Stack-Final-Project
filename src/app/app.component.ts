import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  firstTime: boolean = true;
  title = 'Final Project';
  
  setTime() {
    this.firstTime = false;
  }
}

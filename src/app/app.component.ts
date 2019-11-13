import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MyProject1';

  public keyEvent: Event;

  findResults(event: Event) {
    this.keyEvent = event;
  }
}





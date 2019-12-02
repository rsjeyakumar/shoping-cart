import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private comser: CommunicationService) { }

  ngOnInit() {
    this.comser.getMessage().subscribe(
      (res) => {
        console.log('receiving from header component');
        console.log(res);
      }
    );
  }

}

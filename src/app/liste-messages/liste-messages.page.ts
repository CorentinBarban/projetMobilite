import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {FirebaseService} from "../services/firebase.service";

@Component({
  selector: 'app-list',
  templateUrl: 'liste-messages.page.html',
  styleUrls: ['liste-messages.page.scss']
})
export class ListeMessagesPage implements OnInit {
  private selectedItem: any;
  public items: Array<{ title: string; note: string; icon: string }> = [];

  constructor(
      private navLocation: Location,
      private firebaseService: FirebaseService,
  ) {
  }

  ngOnInit() {
    this.initField(this.items);
  }

  initField(items) {
    this.firebaseService.getAllMessagesForCurrentPosition().then(function (messages) {
      for (let keyM of Object.keys(messages)) {
        console.log(keyM);
        let message = messages[keyM];
        if (message.key == message.idLieu) {
          items.push({
            title: message.message,
            note: message.idUser,
            icon: 'mail'
          });
        }
      }
      ;
    });
  }

  goBack() {
    this.navLocation.back();
  }

}

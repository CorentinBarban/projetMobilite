import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-list',
  templateUrl: 'liste-messages.page.html',
  styleUrls: ['liste-messages.page.scss']
})
export class ListeMessagesPage implements OnInit {
  private selectedItem: any;
  public items: Array<{ title: string; note: string; icon: string }> = [];

  constructor(private navLocation: Location,
  ) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Contenu ' + i,
        note: 'Personne ' + i,
        icon: 'mail'
      });
    }
  }

  ngOnInit() {
  }

  goBack() {
    this.navLocation.back();
  }

}

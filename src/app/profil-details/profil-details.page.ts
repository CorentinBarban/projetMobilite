import { Component, OnInit } from '@angular/core';
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-profil-details',
  templateUrl: './profil-details.page.html',
  styleUrls: ['./profil-details.page.scss'],
})
export class ProfilDetailsPage implements OnInit {

  constructor(
      public menu: MenuController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menu.enable(true);
  }

}

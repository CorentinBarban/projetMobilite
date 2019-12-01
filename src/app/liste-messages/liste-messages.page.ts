import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {FirebaseService} from "../services/firebase.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: 'liste-messages.page.html',
  styleUrls: ['liste-messages.page.scss']
})
export class ListeMessagesPage implements OnInit {
  private selectedItem: any;
  public items: Array<{ title: string; note: string; icon: string }> = [];
    locLieu: any;
  constructor(
      private navLocation: Location,
      private firebaseService: FirebaseService,
      private route: ActivatedRoute
  ) {/*this.route.params.subscribe(params => {this.locLieu = params['loc'];});
    console.log("réception location marker : " + this.locLieu);
    this.initField(this.items, this.locLieu);*/
  }

  ngOnInit() {

  }

    initField(items, location) {

        this.firebaseService.getAllMarkers().then(function (lieux) { // Récupérer les lieux, récupérer les messages, regarder dans l'idUser. Affiche pour le moment tous les messages de tous les lieux, doit trier.
            for (let keyM of Object.keys(lieux)) {
                let lieu = lieux[keyM];
                //if(lieu.get('lat') == location.get('lat') && lieu.get('lgt') == location.get('lgt')){
                items.push({
                    title: lieu.message,
                    note: lieu.idUser,
                    icon: 'mail'
                })
            }
            //}
    });
  }

  goBack() {
    this.navLocation.back();
  }

}

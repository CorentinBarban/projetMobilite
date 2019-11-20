import { Component } from '@angular/core';

import {ActionSheetController, Platform, AlertController} from '@ionic/angular'; //Plugins supplémentaires

import { //Import des plugins GoogleMaps nécessaires
  GoogleMaps,
  GoogleMap,
  GoogleMapsMapTypeId,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

import {Geolocation} from '@ionic-native/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: GoogleMap; //Instance de carte

  constructor(
      public alertController: AlertController,
      public actionCtrl: ActionSheetController,
      private platform: Platform,
      public geolocation: Geolocation
  ) {
    if (this.platform.is('cordova')) {
      this.loadMap();
    }
  }

  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyB_6JvTaVpooi1IF96UN4Cw-lo1nM9yfUo',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyB_6JvTaVpooi1IF96UN4Cw-lo1nM9yfUo'
    });

    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 12, //Ici, set geolocalisation actuelle
          lng: 3.876716
        },
        zoom: 12, //Augmenter le zoom
        tilt: 30
      }
    });
  }

}

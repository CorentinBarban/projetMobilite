import { Component } from '@angular/core';

import {ActionSheetController, Platform, AlertController, LoadingController, ToastController} from '@ionic/angular'; //Plugins supplémentaires

import { //Import des plugins GoogleMaps nécessaires
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    Marker,
    GoogleMapsAnimation,
    MyLocation,
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
loading: any;

  constructor(
      public alertController: AlertController,
      public actionCtrl: ActionSheetController,
      public loadingCtrl: LoadingController,
      public toastCtrl: ToastController,
      private platform: Platform
  ) {
    if (this.platform.is('cordova')) {
      this.loadMap();
      this.getPosition();
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
      },
      zoomControl: false
    });
  }

  async getPosition() {
      this.loading = await this.loadingCtrl.create({
          message: 'Please wait...'
      });
      await this.loading.present();

      // Get the location of you
      this.map.getMyLocation().then((location: MyLocation) => {
          this.loading.dismiss();
          console.log(JSON.stringify(location, null, 2));

          // Move the map camera to the location with animation
          this.map.animateCamera({
              target: location.latLng,
              zoom: 17,
              tilt: 30
          });

          // add a marker
          let marker: Marker = this.map.addMarkerSync({
              title: '@ionic-native/google-maps plugin!',
              snippet: 'This plugin is awesome!',
              position: location.latLng,
              animation: GoogleMapsAnimation.BOUNCE
          });
  });
  }
}

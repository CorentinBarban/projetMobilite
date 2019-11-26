import {Component, OnInit} from '@angular/core';
import {MenuController, IonSlides, NavController} from '@ionic/angular';
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
import {Location} from "@angular/common";

@Component({
    selector: 'app-home',
    templateUrl: 'carte-visites.page.html',
    styleUrls: ['carte-visites.page.scss'],
})
export class CarteVisitesPage implements OnInit {
    map: GoogleMap; //Instance de carte
    loading: any
    location: any;
    labelIndex = 0;

    //Créer liste de marqueurs

    constructor(
        public menu: MenuController,
        public alertController: AlertController,
        public actionCtrl: ActionSheetController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        private platform: Platform,
        public navCtrl: NavController,
        private navLocation: Location,
    ) {

    }

    async ngOnInit() {
        await this.platform.ready();
        await this.loadMap();
        await this.getPosition();
    }

    loadMap() {
        Environment.setEnv({
            API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyB_6JvTaVpooi1IF96UN4Cw-lo1nM9yfUo',
            API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyB_6JvTaVpooi1IF96UN4Cw-lo1nM9yfUo'
        });

        this.map = GoogleMaps.create('map_canvas', {
            camera: {
                target: {
                    lat: 43.610769,
                    lng: 3.876716
                },
                zoom: 11,
                tilt: 30
            }
        });
    }

    async getPosition() {
        this.loading = await this.loadingCtrl.create({
            message: 'Patientez...'
        });
        await this.loading.present();

        // Affichage des marqueurs
        this.map.getMyLocation().then((location: MyLocation) => {
            this.loading.dismiss();
            //Charger liste marqueurs

            // Ajout d'un marker

        });
    }

    ionViewWillEnter() {
        this.menu.enable(true);
    }

    goBack() {
        this.navLocation.back();
    }

}

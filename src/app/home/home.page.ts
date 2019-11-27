import {Component, OnInit} from '@angular/core';
import {MenuController, IonSlides, NavController} from '@ionic/angular';
import {ActionSheetController, Platform, AlertController, LoadingController, ToastController} from '@ionic/angular'; //Plugins supplémentaires
import {FirebaseService} from '../services/firebase.service';
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
export class HomePage implements OnInit {
    map: GoogleMap; //Instance de carte
    loading: any
    location: any;
    labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    labelIndex = 0;

    constructor(
        public menu: MenuController,
        public alertController: AlertController,
        public actionCtrl: ActionSheetController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        private platform: Platform,
        public navCtrl: NavController,
        public firebaseService : FirebaseService,
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

        this.map = GoogleMaps.create('map_canvas');
    }

    async getPosition() {
        this.map.setOptions({zoomControl: false});
        this.loading = await this.loadingCtrl.create({
            message: 'Patientez...'
        });
        await this.loading.present();

        // Récupération de la géolocalisation
        this.map.getMyLocation().then((location: MyLocation) => {
            this.loading.dismiss();
            this.location = location;
            console.log(JSON.stringify(location, null, 2));

            // Animation de caméra
            this.map.animateCamera({
                target: location.latLng,
                zoom: 18,
                tilt: 30
            });

            // Ajout d'un marker
            let marker: Marker = this.map.addMarkerSync({
                title: 'Position',
                snippet: 'Vous êtes ici !',
                icon:'blue',
                position: location.latLng,
                animation: GoogleMapsAnimation.BOUNCE
            });

            marker.showInfoWindow();
        });
    }

    onClickAddMarkerPosition(event) {
        let that = this;

        this.map.getMyLocation().then((location: MyLocation) => {
            that.addMarker(location);
            console.log(location);
        });


    };

    addMarker(location) {
        let marker: Marker = this.map.addMarkerSync({
            position: location.latLng,
            label: this.labels[this.labelIndex++ % this.labels.length],
            animation: GoogleMapsAnimation.BOUNCE
        });
        this.saveMarkerPosition(location);
    }

    saveMarkerPosition(location){
        console.log(location);
        let value = {
            lat:location.latLng.lat,
            lgt: location.latLng.lng,
            date: location.time
        };
        this.firebaseService.createUserPosition(value).then(function(result){
            console.log(result);
        });

    }

    ionViewWillEnter() {
        this.menu.enable(true);
    }

}

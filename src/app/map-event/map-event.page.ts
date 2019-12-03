import {Component, OnInit} from '@angular/core';
import {Environment, GoogleMap, GoogleMaps, GoogleMapsAnimation, GoogleMapsEvent, Marker, MyLocation} from '@ionic-native/google-maps';
import {
    ActionSheetController,
    AlertController,
    LoadingController,
    MenuController,
    NavController,
    Platform,
    ToastController
} from '@ionic/angular';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-map-event',
    templateUrl: './map-event.page.html',
    styleUrls: ['./map-event.page.scss'],
})
export class MapEventPage implements OnInit {

    map: GoogleMap; //Instance de carte
    loading: any;
    location: any;
    labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    labelIndex = 0;
    marker: Marker;
    public showMap: boolean;
    public loadingMatches: boolean;
    public items: Array<{ id: string; nom: string; icon: string }> = [];
    public allItems: Array<{ id: string; nom: string; icon: string }> = [];

    constructor(
        public menu: MenuController,
        public alertController: AlertController,
        public actionCtrl: ActionSheetController,
        public loadingCtrl: LoadingController,
        private platform: Platform,
        public navCtrl: NavController,
        public firebaseService: FirebaseService,
        public router: Router,
        private androidPermissions: AndroidPermissions,
        public afAuth: AngularFireAuth,
    ) {
    }

    async ngOnInit() {
        await this.platform.ready();
        await this.loadMap();
        await this.getPosition();
    }

    /**
     * Charger la map avec google map
     */
    loadMap() {
        Environment.setEnv({
            API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyB_6JvTaVpooi1IF96UN4Cw-lo1nM9yfUo',
            API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyB_6JvTaVpooi1IF96UN4Cw-lo1nM9yfUo'
        });

        this.map = GoogleMaps.create('map_canvas');
    }

    /**
     * Obtenir ca position actuelle
     */

    async getPosition() {
        this.marker = null;
        this.map.setOptions({zoomControl: 'true'});
        this.loading = await this.loadingCtrl.create({
            message: 'Patientez...'
        });
        await this.loading.present();
        // Récupération de la géolocalisation
        this.map.getMyLocation().then((location: MyLocation) => {
            this.loading.dismiss();
            this.location = location;
            // Animation de caméra
            this.map.animateCamera({
                target: location.latLng,
                zoom: 18,
                tilt: 30
            });
            // Ajout d'un marker
            var marker = this.map.addMarker({
                title: 'Position',
                snippet: 'Déplacez-moi pour sélectionner le lieu',
                icon: 'red',
                position: location.latLng,
                draggable: true,
                animation: GoogleMapsAnimation.BOUNCE
            }).then(marker => {
                marker.on(GoogleMapsEvent.MARKER_DRAG_END)
                    .subscribe(() => {
                        this.marker = marker.getPosition();
                        console.log('Coordonnées du marker :' + this.marker);
                    });
                marker.showInfoWindow();
            });
        });
    }

    ionViewWillEnter() {
        this.menu.enable(true);
    }

    goBack() {
        this.location.back();
    }

}

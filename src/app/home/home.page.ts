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
    Environment,
    LatLng
} from '@ionic-native/google-maps';

import {Router} from "@angular/router";
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {AngularFireAuth} from "@angular/fire/auth";
import {formatDate} from "@angular/common";
import * as firebase from "firebase";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})

/**
 * Classe Home
 * Paramétrage et chargement de la carte, des marqueurs en base (s'il y en a) et gestion de la carte (ajout de marqueurs et de messages).
 */
export class HomePage implements OnInit {
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
        public toastCtrl: ToastController,
        private platform: Platform,
        public navCtrl: NavController,
        public firebaseService: FirebaseService,
        public router: Router,
        private androidPermissions: AndroidPermissions,
        public afAuth: AngularFireAuth,
    ) {
    }

    /**
     * Classe lancée lors de l'initalisation de la page.
     * Gère l'instanciation de la carte et des marqueurs.
     */
    async ngOnInit() {
        document.getElementById('liste-personnes').style.display = 'none';
        this.chargerListePersonnes();
        await this.platform.ready();
        await this.loadMap();
        await this.getAllMarkers();
        await this.getAllEvents();
        await this.getAllMarkerUser();
        await this.getPosition();
    }


    /**
     * Instanciation de la carte Google Maps
     */
    loadMap() {
        Environment.setEnv({
            API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyB_6JvTaVpooi1IF96UN4Cw-lo1nM9yfUo',
            API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyB_6JvTaVpooi1IF96UN4Cw-lo1nM9yfUo'
        });

        this.map = GoogleMaps.create('map_canvas');
    }

    /**
     * Obtenir la position géographique actuelle de l'utilisateur
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
            this.marker = this.map.addMarkerSync({
                title: 'Position',
                snippet: 'Vous êtes ici !',
                icon: 'red',
                position: location.latLng,
                animation: GoogleMapsAnimation.BOUNCE
            });
            this.marker.showInfoWindow();
        });
    }

    /**
     * Ajouter un marker sur la carte.
     * @param location : la localisation actuelle de l'utilisateur
     * @param color : la couleur que doit avoir le marqueur
     */

    addMarker(location, color) {
        let date = new Date(location.heure * 1000);
        let marker: Marker = this.map.addMarkerSync({
            position: location.latLng,
            title: 'Lieu taggé',
            snippet: date.toString(),
            animation: GoogleMapsAnimation.BOUNCE,
            icon: color
        });
        this.createMarkerListener(marker);
    }

    /**
     * Ajouter un marqueur de type "évenement" sur la carte, avec une icône différente
     * @param informations
     */

    addMarkerEvent(informations) {
        let startDate = formatDate(informations.startTime, 'medium', 'fr-FR');
        let endDate = formatDate(informations.endTime, 'medium', 'fr-FR');
        let marker: Marker = this.map.addMarkerSync({
            position: informations.latLng,
            title: 'Evenement : ' + informations.title,
            snippet: startDate + ' ' + endDate,
            animation: GoogleMapsAnimation.BOUNCE,
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png'
        });
    }

    /**
     * Sauvegarder un marqueur en base
     * @param location : les diverses informations du marqueur
     * @param message : le message laissé à l'endroit du marqueur (peut être vide)
     */

    saveMarkerPosition(location, message) {
        let value = {
            lat: location.latLng.lat,
            lgt: location.latLng.lng,
            date: location.time,
            msg: message
        };
        this.firebaseService.createUserPosition(value);
    }

    /**
     * Méthode lancée automatiquement
     */

    ionViewWillEnter() {
        this.menu.enable(true);
    }

    /**
     * Rafraîchir l'affichage du marqueur pour afficher la nouvelle position de l'utilisateur
     */

    refresh() {
        this.map.getMyLocation().then((location: MyLocation) => {
            this.marker.setPosition(location.latLng);
            this.marker.showInfoWindow();
        });
    }

    /**
     * Ouvrir la pop-up pour laisser un message sur un lieu
     * @returns {Promise<void>}
     */

    async presentMessageEvent() {
        const alert = await this.alertController.create({
            header: 'Ecrire un message',
            inputs: [{
                name: 'message',
                type: 'text',
                placeholder: 'Saisir votre message'
            }],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Retour confirmé');
                    }
                }, {
                    text: 'Valider',
                    handler: (messageData) => {
                        let that = this;
                        this.map.getMyLocation().then((location: MyLocation) => {
                            let position = {
                                'latLng': location.latLng,
                                'time': location.time
                            };
                            that.addMarker(position, 'blue');
                            that.saveMarkerPosition(position, messageData.message);
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    /**
     * Permet de marquer un lieu sans laisser de message (J'y étais)
     */

    async marquerLieu() {
        let that = this;
        this.map.getMyLocation().then((location: MyLocation) => {
            let position = {
                'latLng': location.latLng,
                'time': location.time
            };
            this.verifierPresenceEvent(position);

            that.addMarker(position, 'blue');
            that.saveMarkerPosition(position, null);
        });
    }

    /**
     * Vérification de la présence d'un évenement à l'endroit où se trouve l'utilisateur, pour prendre en compte sa participation ou non.
     * @param position de l'utilisateur
     */

    verifierPresenceEvent(position) {
        var that = this;
        this.firebaseService.getAllEvents().then(function (events) {
            for (let key of Object.keys(events)) {
                let event = events[key];
                if (Math.round(position.latLng.lat * 100) / 100 == Math.round(event.lat * 100) / 100 && Math.round(position.latLng.lng * 100) / 100 == Math.round(event.lng * 100) / 100) {
                    that.afAuth.user.subscribe(currentUser => {
                        if (currentUser) {
                            firebase.database().ref('/evenements/' + key + '/participants/').update({
                                idUser: currentUser.uid
                            });
                        }
                    });
                }
            }
        });
    }

    /**
     * Récupérer tous les marqueurs en base appartenant à l'utilisateur avant de les afficher sur la carte
     */
    getAllMarkerUser() {
        let that = this;
        this.firebaseService.getAllMarkerForCurrentUser().then(function (lieux) {
            for (let key of Object.keys(lieux)) {
                let lieu = lieux[key];
                let position = {
                    'latLng': {
                        'lat': lieu.lat,
                        'lng': lieu.lgt
                    },
                    'heure': lieu.horodatage
                };
                that.addMarker(position, 'blue');
            }
        }).catch(error => console.log('Erreur : liste de lieux vide pour user (home-page.ts)'));
    }

    /**
     * Créer un écouteur sur un marqueur afin d'afficher les messages qui y ont été déposés
     * @param marker
     */

    async createMarkerListener(marker) {
        let that = this;
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            let loc = marker.get('position');
            let coord = loc.lat + '&' + loc.lng;
            this.router.navigate(['/liste-messages', coord]);
        });
    }

    /**
     * Récupérer tous les autres marqueurs qui sont en base et qui n'appartiennent pas à l'utilisateur afin de les ajouter sur la carte
     */

    getAllMarkers() {
        let that = this;
        this.firebaseService.getAllMarkers().then(function (lieux) {
            for (let key of Object.keys(lieux)) {
                let lieu = lieux[key];
                let position = {
                    'latLng': {
                        'lat': lieu.lat,
                        'lng': lieu.lgt
                    },
                    'heure': lieu.horodatage
                };
                that.addMarker(position, 'green');
            }
        }).catch(error => console.log('Erreur : liste de lieux vide (home-page.ts)'));
    }

    /**
     * Récupérer tous les évenements des autres utilisateurs en base
     */

    getAllEvents() {
        let that = this;
        this.firebaseService.getAllEvents().then(function (events) {
            for (let key of Object.keys(events)) {
                let event = events[key];
                let informations = {
                    title: event.title,
                    description: event.description,
                    'latLng': {
                        'lat': event.lat,
                        'lng': event.lng,
                    },
                    startTime: event.startTime,
                    endTime: event.endTime
                };
                that.addMarkerEvent(informations);
            }
        }).catch(error => console.log('Erreur : liste d events est vide (home-page.ts)'));
    }

    /**
     * Charger la liste des personnes inscrites dans une liste pour la recherche par utilisateur
     */

    chargerListePersonnes() {
        let that = this;
        this.firebaseService.getAllUsers().then(function (personnes) {
            for (let key of Object.keys(personnes)) {
                let personne = personnes[key];
                that.items.push({
                    id: key,
                    nom: personne.nom + ' ' + personne.prenom,
                    icon: 'contact'
                });
                that.allItems = that.items;
            }
        });
    }

    /**
     * Affichage de la liste avec la personne concernée en fonction de la recherche
     * @param event l'évenement déclenchant la méthode, contenant les informations
     */

    getResults(event) {
        document.getElementById('map_canvas').style.display = 'none';
        document.getElementById('liste-personnes').style.display = 'contents';
        this.items = this.allItems;
        const val = event.detail.value;

        if (val.trim() !== '') {
            this.items = this.items.filter(term => {
                return term.nom.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
            });
        }
    }

    /**
     * Rediriger vers la page d'affichage des détails du profil dans la recherche utilisateur
     * @param id : l'id utilisateur en question
     */
    afficherDetails(id) {
        this.router.navigate(['/profil-details', id]);
    }

    /**
     * Cacher la liste de personnes et afficher la carte lors du clic sur la bouton d'annulation dans la barre de recherche
     */
    onCancel() {
        document.getElementById('liste-personnes').style.display = 'none';
        document.getElementById('map_canvas').style.display = 'contents';
    }

    /**
     * Afficher le profil de l'utilisateur connecté
     */

    afficherProfil() {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    this.router.navigate(['/profil-details', currentUser.uid]);
                }
            });
        });
    }
}

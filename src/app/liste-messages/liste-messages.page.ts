import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {FirebaseService} from "../services/firebase.service";
import {ActivatedRoute} from "@angular/router";
import {MyLocation} from "@ionic-native/google-maps";
import {AlertController} from "@ionic/angular";

@Component({
    selector: 'app-list',
    templateUrl: 'liste-messages.page.html',
    styleUrls: ['liste-messages.page.scss']
})

/**
 * Cette classe permet de récupérer les différents messages laissés à un lieu taggué
 */
export class ListeMessagesPage implements OnInit {
    private selectedItem: any;
    public items: Array<{ message: string; mail: string; icon: string }> = [];
    private locationLieu;
    private idLieu;
    private lat;
    private lng;

    constructor(
        private activatedRoute: ActivatedRoute,
        private navLocation: Location,
        private firebaseService: FirebaseService,
        public alertController: AlertController,
    ) {
        this.activatedRoute.params.subscribe((res) => {
            this.locationLieu = res['location'];
            this.lat = +this.locationLieu.substr(0, this.locationLieu.indexOf('&'));
            this.lng = +this.locationLieu.substr(this.locationLieu.indexOf('&') + 1, this.locationLieu.length);
        });
    }

    ngOnInit() {
        this.initField(this.items);
    }

    /**
     * Initialisation de la liste de messages
     * @param items
     */
    initField(items) {
        var that = this;
        this.firebaseService.getAllMarkers().then(function (lieux) {
            for (let key of Object.keys(lieux)) {
                let lieu = lieux[key];
                if (Math.round(lieu.lat * 100) / 100 == Math.round(that.lat * 100) / 100 && Math.round(lieu.lgt * 100) / 100 == Math.round(that.lng * 100) / 100) {
                    that.idLieu = key;
                    if (lieu.messages != undefined) {
                        document.getElementById("vide").innerHTML = "";
                        for (let keyLieu of Object.keys(lieu.messages)) {
                            let message = lieu.messages[keyLieu];
                            items.push({
                                message: message,
                                icon: 'mail'
                            })
                        }
                    } else if (lieu.messages == undefined) {
                        document.getElementById("vide").innerHTML = "Aucun message n'a été déposé pour le moment.";
                    }
                }
            }
        }).catch(error => console.log('Erreur : liste de lieux vide (liste-messages.ts)'));
    }

    /**
     * Retour en arrière
     */
    goBack() {
        this.navLocation.back();
    }

    /**
     * Ajouter un message à la liste des messages déja existants
     */
    async ajouterMessage() {
        const alert = await this.alertController.create({
            header: 'Ecrire un message',
            inputs: [{
                name: 'msg',
                type: 'text',
                placeholder: 'Saisir votre message'
            }],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Valider',
                    handler: (messageData) => {
                        let that = this;
                        console.log(messageData);
                        that.firebaseService.createMessage(messageData, that.idLieu);
                        that.firebaseService.addMessageToLieu(messageData, that.idLieu);
                        this.goBack();
                        presentToast();
                    }
                }
            ]
        });

        await alert.present();

        /**
         * Afficher un toast lorsque le message est crée
         * @returns {Promise<any>}
         */
        async function presentToast() { //Afficher un toast lorsque le message est créé
            const toast = document.createElement('ion-toast');
            toast.message = 'Message ajouté !';
            toast.duration = 1000;

            document.body.appendChild(toast);
            return toast.present();
        }
    }

}

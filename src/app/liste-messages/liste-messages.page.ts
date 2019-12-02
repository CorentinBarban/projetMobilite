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
            console.log('Lat : ' + this.lat + ' Lng : ' + this.lng);
        });
    }

    ngOnInit() {
        this.initField(this.items);
    }

    initField(items) {
        var that = this;

        this.firebaseService.getAllMarkers().then(function (lieux) {
            for (let key of Object.keys(lieux)) {
                let lieu = lieux[key];
                //console.log(Math.round(lieu.lat * 100) / 100 + ' ' + Math.round(that.lat * 100) / 100 + ' ' + Math.round(lieu.lgt * 100) / 100 + ' ' + Math.round(that.lng * 100) / 100); // Il faut arrondir la valeur
                //if (Math.round(lieu.lat * 100) / 100 == Math.round(that.lat * 100) / 100 && Math.round(lieu.lgt * 100) / 100 == Math.round(that.lng * 100) / 100) {
                if (Math.round(lieu.lat * 100) / 100 == Math.round(that.lat * 100) / 100 && Math.round(lieu.lgt * 100) / 100 == Math.round(that.lng * 100) / 100) {
                    that.idLieu = key;
                    console.log(that.idLieu);
                    if (lieu.messages != undefined) {
                        document.getElementById("vide").innerHTML = null;
                        for (let keyLieu of Object.keys(lieu.messages)) {
                            let message = lieu.messages[keyLieu];
                            items.push({
                                message: message,
                                icon: 'mail'
                            })
                        }
                    } else {
                        document.getElementById("vide").innerHTML = "Aucun message n'a été déposé pour le moment.";
                    }
                }
            }
        });
    }

    goBack() {
        this.navLocation.back();
    }

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
                        that.firebaseService.createMessage(messageData, that.idLieu);
                        that.firebaseService.addMessageToLieu(messageData, that.idLieu);
                        this.goBack();
                    }
                }
            ]
        });

        await alert.present();
        presentToast();

        async function presentToast() {
            const toast = document.createElement('ion-toast');
            toast.message = 'Message ajouté !';
            toast.duration = 1000;

            document.body.appendChild(toast);
            return toast.present();
        }
    }

}

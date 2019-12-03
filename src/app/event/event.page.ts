import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {NavParams} from '@ionic/angular';
import {formatDate} from '@angular/common';
import {FirebaseService} from "../services/firebase.service";

@Component({
    selector: 'app-event',
    templateUrl: './event.page.html',
    styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
    title: string;
    description: string;
    start: string;
    end: string;
    lat: string;
    lng: string;
    public listePersonnes: Array<{ nom: string; email: string; url: string; }> = [];

    constructor(
        public modalController: ModalController,
        public navParams: NavParams,
        private firebaseService: FirebaseService,
    ) {
        this.title = navParams.get('title');
        this.description = navParams.get('description');
        this.lat = navParams.get('lat');
        this.lng = navParams.get('lng');
        this.start = formatDate(navParams.get('startTime'), 'medium', 'fr-FR');
        this.end = formatDate(navParams.get('endTime'), 'medium', 'fr-FR');
    }

    ngOnInit() {
        this.initFields();
    }

    initFields() {
        var that = this;
        this.firebaseService.getAllEvents().then(function (events) {
            for (let key of Object.keys(events)) {
                let event = events[key];
                if (event.participants != undefined) {
                    console.log('Titre :' + event.title);
                    if (event.title == that.title) {
                        for (let keyU of Object.keys(event.participants)) {
                            let user = event.participants[keyU];
                            that.firebaseService.getUserInformation(user).then(function (personne) {
                                that.listePersonnes.push({
                                    email: personne.email,
                                    nom: personne.nom + ' ' + personne.prenom,
                                    url: personne.url,
                                });
                            });
                        }
                    } else {
                        console.log('titre ne corresponds pas');
                    }
                } else {
                    console.log('Liste parti vide');
                }
            }
        });

    }

    close() {
        this.modalController.dismiss();
    }

}

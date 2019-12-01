import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {FirebaseService} from "../services/firebase.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-list',
    templateUrl: 'liste-personnes-lieu.page.html',
    styleUrls: ['liste-personnes-lieu.page.scss']
})
export class ListePersonnesLieuPage implements OnInit {
    public listePersonnesId: Array<string> = [];
    public listePersonnes: Array<{ nom: string; email: string; url: string; }> = [];
    private idLieu;
    private count;
    private latLieu;
    private lgtLieu;

    constructor(private navLocation: Location,
                private firebaseService: FirebaseService,
                private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((res) => {
            this.idLieu = res['id'];
            this.count = res['count'];
        });
    }

    async ngOnInit() {
        await this.getPosition();
        console.log('Affichage liste id :' + this.listePersonnesId[0]);
        console.log('Affichage personnes :' + this.listePersonnes);
    }

    getPosition() {
        var that = this;
        console.log('Get Position :');
        this.firebaseService.getPosition(that.idLieu).then(function (infos) {
            that.latLieu = infos.lat;
            that.lgtLieu = infos.lgt;
            document.getElementById("nom").innerHTML = 'Lieu ' + that.count;
            document.getElementById("lat").innerHTML = 'Lat : ' + infos.lat;
            document.getElementById("lgt").innerHTML = 'Lgt : ' + infos.lgt;
            that.getAllMarkers();
        });

    }

    getAllMarkers() {
        var that = this;
        console.log('Get Markers :');
        this.firebaseService.getAllMarkers().then(function (lieux) {
            for (let key of Object.keys(lieux)) {
                let lieu = lieux[key];
                if (lieu.lat == that.latLieu && lieu.lgt == that.lgtLieu) {
                    console.log('egal, stockage de user ' + lieu.idUser);
                    that.listePersonnesId.push(lieu.idUser);
                } else {
                    console.log('Non egal');
                }
            }
            that.getUsers();
        });
    }

    getUsers() {
        var that = this;
        console.log('Get Users :');
        for (var i = 0; i < this.listePersonnesId.length; i++) {
            let personne = that.listePersonnesId[i];
            console.log('Perseo : ' + that.listePersonnesId[i]);
            this.firebaseService.getUserInformation(personne).then(function (infos) {
                that.listePersonnes.push({
                    nom: infos.nom + ' ' + infos.prenom,
                    email: infos.email,
                    url: infos.url
                });
            });
        }
    }

    goBack() {
        this.navLocation.back();
    }

}

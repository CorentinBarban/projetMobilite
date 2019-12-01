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
    private selectedItem: any;
    public listePersonnesId: Array<{ id: string; }> = [];
    public listePersonnes: Array<{ id: string; nom: string; email: string; url: string; }> = [];
    private idLieu;
    private count;
    private titreLieu;
    private coord;

    constructor(private navLocation: Location,
                private firebaseService: FirebaseService,
                private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((res) => {
            this.idLieu = res['id'];
            this.count = res['count'];
        });
    }

    ngOnInit() {
        this.initFields(this.idLieu, this.listePersonnesId, this.count, this.listePersonnes);
    }

    initFields(lieu, listePersonnesId, count, listePersonnes) {
        let latLieu;
        let lgtLieu;

        this.firebaseService.getPosition(lieu).then(function (infos) {
            document.getElementById("nom").innerHTML = 'Lieu ' + count;
            document.getElementById("lat").innerHTML = 'Lat : ' + infos.lat;
            document.getElementById("lgt").innerHTML = 'Lgt : ' + infos.lgt;

            latLieu = infos.lat;
            lgtLieu = infos.lgt;
            console.log('Coord :' + latLieu + lgtLieu);

        });

        this.firebaseService.getAllMarkers().then(function (lieux) {
            for (let key of Object.keys(lieux)) {
                let lieu = lieux[key];
                if (lieu.lat == latLieu && lieu.lgt == lgtLieu) {
                    console.log('egal, stockage de user ' + lieu.idUser);
                    listePersonnesId.push({
                        id: lieu.idUser
                    });
                } else {
                    console.log('Non egal');
                }
            }
        });


        for (let key of Object.keys(listePersonnesId)) {
            let personne = listePersonnesId[key];
            listePersonnes.push({
                id: key,
                nom: personne.nom + ' ' + personne.prenom,
                email: personne.email,
                url: personne.url
            });
        }

    }


    goBack() {
        this.navLocation.back();
    }

}

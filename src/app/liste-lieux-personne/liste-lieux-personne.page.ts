import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {FirebaseService} from "../services/firebase.service";
import {ActivatedRoute} from '@angular/router';
import {DatabaseReference} from "@angular/fire/database/interfaces";
import {FirebaseDatabase} from "@angular/fire/firebase.app.module";

@Component({
    selector: 'app-list',
    templateUrl: 'liste-lieux-personne.page.html',
    styleUrls: ['liste-lieux-personne.scss']
})
export class ListeLieuxPersonnePage implements OnInit {
    private selectedItem: any;
    public items: Array<{ id: string; coord: string; icon: string; horodatage: string; }> = [];
    private personne;
    private email;
    private nom;
    private photoURL;


    constructor(private navLocation: Location,
                private firebaseService: FirebaseService,
                private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.queryParams.subscribe((res) => {
            this.personne = res;
            console.log(this.personne);
            this.email = this.personne.email;
            this.nom = this.personne.nom;
            this.photoURL = this.personne.url;
        });

        //this.initFields(this.personne, this.items);
    }

    ngOnInit() {
    }

    async initFields(user, items) {
        this.firebaseService.getUserPositions(user).then(function (lieux) { // Récupérer les users, matcher avec l'adresse mail, regarder dans les lieux, matcher avec l'adresse mail.
            for (let key of Object.keys(lieux)) {
                let lieu = lieux[key];
                items.push({
                    id: lieu.email,
                    coord: lieu.nom + ' ' + lieu.prenom,
                    icon: 'flag',
                })
            }
        });
    }


    goBack() {
        this.navLocation.back();
    }

}

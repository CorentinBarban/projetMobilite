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
    public listeLieux: Array<{ id: string; lat: string; lgt: string; icon: string; horodatage: string; }> = [];
    private idPersonne;
    private email;
    private nom;
    private photoURL;

    constructor(private navLocation: Location,
                private firebaseService: FirebaseService,
                private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe((res) => {
            this.idPersonne = res['id'];
            console.log('Id : ' + this.idPersonne);
        });
    }

    ngOnInit() {
        this.initFields(this.idPersonne, this.listeLieux);
    }

    initFields(user, listeLieux) {
        this.firebaseService.getUserInformation(user).then(function (infos) {

            document.getElementById("nom").innerHTML = infos.nom + ' ' + infos.prenom;
            document.getElementById("mail").innerHTML = infos.email;
            let image = document.getElementById("url") as HTMLImageElement;
            image.src = infos.url;

            if (infos.lieux != undefined) {
                for (let keyLieu of Object.keys(infos.lieux)) {
                    let lieu = infos.lieux[keyLieu];
                    listeLieux.push({
                        id: 'Lieu ' + lieu.idLieu,
                        lat: 'Lat: ' + lieu.lat,
                        lgt: 'Lgt: ' + lieu.lgt,
                        horodatage: lieu.horodatage,
                        icon: 'flag'
                    });
                }
            } else {
                document.getElementById("vide").innerHTML = "La liste de lieux pour cet utilisateur est vide.";
            }
        });
    }


    goBack() {
        this.navLocation.back();
    }

}

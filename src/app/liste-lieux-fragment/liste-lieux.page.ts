import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {FirebaseService} from "../services/firebase.service";

@Component({
    selector: 'app-list',
    templateUrl: 'liste-lieux.page.html',
    styleUrls: ['liste-lieux.page.scss']
})

/**
 * Classe servant de fragment contient la liste des lieux taggés, afin de les afficher dans les onglets de la vue modérateur.
 */
export class ListeLieuxPage implements OnInit {
    private selectedItem: any;
    public items: Array<{ id: string; count: string; icon: string; lat: string; lgt: string; }> = [];

    constructor(
        private navLocation: Location,
        private router: Router,
        private firebaseService: FirebaseService,
    ) {
        this.initFields(this.items);
    }

    ngOnInit() {
    }

    /**
     * Récupère tous les lieux présents en base et les affiche dans une liste
     * @param items la liste devant contenir les lieux afin de les afficher dans la liste
     */
    initFields(items) {
        let i = 1;
        this.firebaseService.getAllMarkers().then(function (lieux) { // Récupérer les lieux, regarder dans l'idUser.
            for (let key of Object.keys(lieux)) {
                let lieu = lieux[key];
                items.push({
                    id: key,
                    count: i,
                    lat: 'Lat: ' + lieu.lat,
                    lgt: 'Lgt: ' + lieu.lgt,
                    icon: 'flag'
                })
                i++;
            }
        });
    }

    /**
     * Affiche la liste des personnes ayant taggé une ou plusieurs fois ce lieu
     * @param id l'id du lieu
     * @param count une variable servant à savoir le numéro du lieu taggé pour l'affichage
     */
    afficherDetails(id, count) {
        this.router.navigate(['/vue-moderateur/liste-lieux/liste-personnes-lieu', id, count]);
    }

    /**
     * Retour en arrière
     */
    goBack() {
        this.navLocation.back();
    }

}

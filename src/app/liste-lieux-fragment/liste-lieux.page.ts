import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {FirebaseService} from "../services/firebase.service";

@Component({
    selector: 'app-list',
    templateUrl: 'liste-lieux.page.html',
    styleUrls: ['liste-lieux.page.scss']
})
export class ListeLieuxPage implements OnInit {
    private selectedItem: any;
    public items: Array<{ title: string; note: string; icon: string }> = [];

    constructor(
        private navLocation: Location,
        private router: Router,
        private firebaseService: FirebaseService,
    ) {
        this.initFields(this.items);
    }

    ngOnInit() {
    }

    initFields(items) {
        let i = 1;
        this.firebaseService.getAllMarkers().then(function (lieux) { // Récupérer les lieux, regarder dans l'idUser.
            for (let key of Object.keys(lieux)) {
                let lieu = lieux[key];
                items.push({
                    id: lieu.horodatage,
                    count: i,
                    icon: 'flag'
                })
                i++;
            }
        });
    }

    afficherDetails(item) {
        this.router.navigateByUrl('/vue-moderateur/liste-lieux/liste-personnes-lieu');
    }

    goBack() {
        this.navLocation.back();
    }

}

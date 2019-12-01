import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {FirebaseService} from "../services/firebase.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-list',
    templateUrl: 'liste-messages.page.html',
    styleUrls: ['liste-messages.page.scss']
})
export class ListeMessagesPage implements OnInit {
    private selectedItem: any;
    public items: Array<{ message: string; mail: string; icon: string }> = [];
    private idLieu;
    private lat;
    private lng;

    constructor(
        private activatedRoute: ActivatedRoute,
        private navLocation: Location,
        private firebaseService: FirebaseService
    ) {
        this.activatedRoute.params.subscribe((res) => {
            this.idLieu = res['location'];
            this.lat = +this.idLieu.substr(0, this.idLieu.indexOf('&'));
            this.lng = +this.idLieu.substr(this.idLieu.indexOf('&') + 1, this.idLieu.length);
            console.log('Lat : ' + this.lat + ' Lng : ' + this.lng);
        });
    }

    ngOnInit() {

        this.initField(this.items);

    }

    initField(items) {
        var that = this;

        this.firebaseService.getAllMarkers().then(function (lieux) { // Récupérer les lieux, voir si lat & lgt sont les mêmes , récupérer le message
            for (let keyM of Object.keys(lieux)) {
                let lieu = lieux[keyM];
                console.log(Math.round(lieu.lat * 100) / 100 + ' ' + Math.round(that.lat * 100) / 100 + ' ' + Math.round(lieu.lgt * 100) / 100 + ' ' + Math.round(that.lng * 100) / 100); // Il faut arrondir la valeur
                if (Math.round(lieu.lat * 100) / 100 == Math.round(that.lat * 100) / 100 && Math.round(lieu.lgt * 100) / 100 == Math.round(that.lng * 100) / 100) {
                    items.push({
                        message: lieu.message,
                        note: lieu.idUser,
                        icon: 'mail'
                    })
                }
            }
        });
    }

    goBack() {
        this.navLocation.back();
    }

}

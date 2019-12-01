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
            this.lat = this.idLieu.substr(0, this.idLieu.indexOf('&'));
            this.lng = this.idLieu.substr(this.idLieu.indexOf('&') + 1, this.idLieu.length);
            console.log('Lat : ' + this.lat + ' Lng : ' + this.lng);
        });
    }

    ngOnInit() {

    }

    initField(items, location) {
        var that = this;

        this.firebaseService.getAllMarkers().then(function (lieux) { // Récupérer les lieux, voir si lat & lgt sont les mêmes , récupérer le message
            for (let keyM of Object.keys(lieux)) {
                let lieu = lieux[keyM];
                if (lieu.lat == that.lat && lieu.lgt == that.lng) {
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

import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";

@Component({
    selector: 'app-list',
    templateUrl: 'liste-lieux-personne.page.html',
    styleUrls: ['liste-lieux-personne.scss']
})
export class ListeLieuxPersonnePage implements OnInit {
    private selectedItem: any;
    public items: Array<{ title: string; note: string; icon: string }> = [];

    constructor(private navLocation: Location,
    ) {
        for (let i = 1; i < 21; i++) {
            this.items.push({
                title: 'Lieu ' + i,
                note: 'Coordonnées',
                icon: 'flag'
            });
        }
    }

    ngOnInit() {
    }

    goBack() {
        this.navLocation.back();
    }

}

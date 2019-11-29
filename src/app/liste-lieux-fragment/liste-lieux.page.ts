import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";

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
        private router: Router
    ) {
        for (let i = 1; i < 21; i++) {
            this.items.push({
                title: 'Lieu ' + i,
                note: null,
                icon: 'flag'
            });
        }
    }

    ngOnInit() {
    }

    afficherDetails(item) {
        this.router.navigateByUrl('/vue-moderateur/liste-lieux/liste-personnes-lieu');
    }

    goBack() {
        this.navLocation.back();
    }

}
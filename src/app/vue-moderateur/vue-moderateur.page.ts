import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: 'vue-moderateur.page.html',
    styleUrls: ['vue-moderateur.page.scss']
})
export class VueModerateurPage implements OnInit {
    private selectedItem: any;
    public items: Array<{ title: string; note: string; icon: string }> = [];

    constructor() {
        for (let i = 1; i < 11; i++) {
            this.items.push({
                title: 'Adresse ' + i + ', Heure : ' + i,
                note: 'Lieu n°' + i,
                icon: 'flag'
            });
        }
    }

    ngOnInit() {
    }

    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }
}

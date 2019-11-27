import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: 'vue-moderateur.page.html',
    styleUrls: ['vue-moderateur.page.scss']
})

export class VueModerateurPage implements OnInit {
    private selectedItem: any;
    public items: Array<{ title: string; note: string; icon: string }> = [];

    constructor() {
    }

    ngOnInit() {
    }

    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }
}

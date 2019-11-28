import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {ListeLieuxPersonnePage} from './liste-lieux-personne.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ListeLieuxPersonnePage
            }
        ])
    ],
    declarations: [ListeLieuxPersonnePage]
})
export class ListeLieuxPersonnePageModule {
}

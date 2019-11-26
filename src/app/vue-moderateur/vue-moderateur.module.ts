import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {VueModerateurPage} from './vue-moderateur.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: VueModerateurPage
            }
        ])
    ],
    declarations: [VueModerateurPage]
})
export class VueModerateurPageModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MapEventPageRoutingModule} from './map-event-routing.module';

import {MapEventPage} from './map-event.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MapEventPageRoutingModule
    ],
    declarations: [MapEventPage]
})
export class MapEventPageModule {
}

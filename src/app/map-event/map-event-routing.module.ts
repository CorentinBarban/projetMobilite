import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MapEventPage} from './map-event.page';

const routes: Routes = [
    {
        path: '',
        component: MapEventPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MapEventPageRoutingModule {
}

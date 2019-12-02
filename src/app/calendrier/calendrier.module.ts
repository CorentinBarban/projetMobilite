import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {CalendrierPage} from './calendrier.page';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {NgCalendarModule} from "ionic2-calendar";

registerLocaleData(localeFr, 'fr');

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: CalendrierPage
            }
        ]),
        NgCalendarModule
    ],
    declarations: [CalendrierPage]
})
export class CalendrierPageModule {
}

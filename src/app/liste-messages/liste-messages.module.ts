import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import {ListeMessagesPage} from './liste-messages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
          component: ListeMessagesPage
      }
    ])
  ],
    declarations: [ListeMessagesPage]
})
export class ListeMessagesPageModule {
}

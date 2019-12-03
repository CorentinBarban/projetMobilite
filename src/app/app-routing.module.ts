import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'vue-moderateur',
    loadChildren: () => import('./vue-moderateur/vue-moderateur.module').then(m => m.VueModerateurPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profil-details-edit/:id',
    loadChildren: () => import('./profil-details-edit/profil-details-edit.module').then(m => m.ProfilDetailsEditPageModule)
  },
  {
    path: 'profil-details/:id',
    loadChildren: () => import('./profil-details/profil-details.module').then(m => m.ProfilDetailsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'liste-messages/:location',
    loadChildren: () => import('./liste-messages/liste-messages.module').then(m => m.ListeMessagesPageModule)
  },
  {
    path: 'liste-personnes',
    loadChildren: () => import('./liste-personnes-fragment/liste-personnes.module').then(m => m.ListePersonnesPageModule)
  },
  {
    path: 'liste-lieux',
    loadChildren: () => import('./liste-lieux-fragment/liste-lieux.module').then(m => m.ListeLieuxPageModule)
  }, {
    path: 'calendrier',
    loadChildren: () => import('./calendrier/calendrier.module').then(m => m.CalendrierPageModule)
  },
  {
    path: 'event/',
    loadChildren: () => import('./event/event.module').then(m => m.EventPageModule)
  },
  {
    path: 'map-event/:id',
    loadChildren: () => import('./map-event/map-event.module').then(m => m.MapEventPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

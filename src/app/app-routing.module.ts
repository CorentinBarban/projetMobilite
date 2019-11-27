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
    path: 'profil-details',
    loadChildren: () => import('./profil-details/profil-details.module').then( m => m.ProfilDetailsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'carte-visites',
    loadChildren: () => import('./carte-visites/carte-visites.module').then(m => m.CarteVisitesPageModule)
  },
  {
    path: 'liste-messages',
    loadChildren: () => import('./liste-messages/liste-messages.module').then(m => m.ListeMessagesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

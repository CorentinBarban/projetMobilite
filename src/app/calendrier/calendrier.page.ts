import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuController, IonSlides, NavController} from '@ionic/angular';
import {ActionSheetController, Platform, AlertController, LoadingController, ToastController} from '@ionic/angular'; //Plugins supplémentaires
import {FirebaseService} from '../services/firebase.service';
import {Router} from "@angular/router";
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import {AngularFireAuth} from "@angular/fire/auth";
import {NgCalendarModule} from 'ionic2-calendar';
import {CalendarComponent} from 'ionic2-calendar/calendar';
import {AngularFireDatabase} from '@angular/fire/database';
import {ModalController} from '@ionic/angular';
import {EventPage} from '../event/event.page';

@Component({
    selector: 'app-home',
    templateUrl: 'calendrier.page.html',
    styleUrls: ['calendrier.page.scss'],
})

/**
 * Classe réalisant l'affichage et la gestion du calendrier et des évenements qui y sont liés.
 */

export class CalendrierPage implements OnInit {
    public currentDate = new Date();
    public currentMonth: string;
    public mode = 'month';
    public afAuth: AngularFireAuth;
    public showAddEvent: boolean;
    public minDate = new Date().toISOString();
    public myCal = document.getElementById('myCal');
    public newEvent = {
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        lat: '',
        lgt: ''
    };

    public calendar;

    public allEvents = [];

    @ViewChild(CalendarComponent, {static: false}) myCalendar: CalendarComponent;

    constructor(
        public modalController: ModalController,
        private afDB: AngularFireDatabase,
        private router: Router
    ) {
        this.loadEvent();
    }

    async ngOnInit() {
    }

    /**
     * Gestion du changement du mois affiché dans le titre du calendrier
     * @param title
     */

    onViewTitleChanged(title: string) {
        this.currentMonth = title;
    }

    /**
     * Cacher/afficher le formulaire d'ajout d'évenement
     */

    showHideForm() {
        this.showAddEvent = !this.showAddEvent;
        this.newEvent = {
            title: '',
            description: '',
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            lat: '',
            lgt: ''
        };
    }


    /**
     * Ajouter un évenement en base. Les coordonnées ne sont pas initialisées ici, car elles le seront plus tard.
     */

    addEvent() {
        let key = this.afDB.list('evenements').push({
            title: this.newEvent.title,
            startTime: this.newEvent.startTime,
            endTime: this.newEvent.endTime,
            description: this.newEvent.description,
            lat: '',
            lng: ''
        });
        this.showHideForm();
        this.selectLocation(key.key);
    }

    /**
     * Redirige vers la page de sélection de lieu pour l'évenement fraîchement créé;
     * @param idEvent l'évenement en question
     */

    selectLocation(idEvent) {
        this.router.navigate(['/map-event', idEvent]);
    }

    /**
     * Charger tous les évenements présents en base afin de les assigner au calendrier, pour ensuite pouvoir les afficher
     */
    loadEvent() {
        var that = this;
        this.afDB.list('/evenements').snapshotChanges(['child_added']).subscribe(actions => {
            this.allEvents = [];
            actions.forEach(action => {
                this.allEvents.push({
                    title: action.payload.exportVal().title,
                    startTime: new Date(action.payload.exportVal().startTime),
                    endTime: new Date(action.payload.exportVal().endTime),
                    description: action.payload.exportVal().description,
                    lat: action.payload.exportVal().lat,
                    lng: action.payload.exportVal().lng
                });

            });
        });
    }

    /**
     * Ouvrir une modale contenant les informations de l'évenement
     * @param event
     */

    async onEventSelected(event: any) {
        const modal = await this.modalController.create({
            component: EventPage,
            componentProps: event
        });
        return await modal.present();
    }

    /**
     * Gère automatiquement la sélection de la date du jour pour la création d'un évenement
     * @param ev
     */

    onTimeSelected(ev: any) {
        const selected = new Date(ev.selectedTime);
        this.newEvent.startTime = selected.toISOString();
        selected.setHours(selected.getHours() + 1);
        this.newEvent.endTime = (selected.toISOString());
    }

    /**
     * Rediriger vers la page de détails du profil de l'utilisateur connecté
     */

    afficherProfil() {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.user.subscribe(currentUser => {
                if (currentUser) {
                    this.router.navigate(['/profil-details', currentUser.uid]);
                }
            });
        });
    }
}

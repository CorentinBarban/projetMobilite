import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ListePersonnesPage} from './liste-personnes.page';

describe('ListPage', () => {
    let component: ListePersonnesPage;
    let fixture: ComponentFixture<ListePersonnesPage>;
    let listPage: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListePersonnesPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ListePersonnesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a list of 10 elements', () => {
        listPage = fixture.nativeElement;
        const items = listPage.querySelectorAll('ion-item');
        expect(items.length).toEqual(10);
    });

});

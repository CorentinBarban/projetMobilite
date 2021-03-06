import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ListeLieuxPersonnePage} from './liste-lieux-personne.page';

describe('ListPage', () => {
    let component: ListeLieuxPersonnePage;
    let fixture: ComponentFixture<ListeLieuxPersonnePage>;
    let listPage: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListeLieuxPersonnePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ListeLieuxPersonnePage);
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

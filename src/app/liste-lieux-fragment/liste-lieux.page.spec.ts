import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ListeLieuxPage} from './liste-lieux.page';

describe('ListPage', () => {
    let component: ListeLieuxPage;
    let fixture: ComponentFixture<ListeLieuxPage>;
    let listPage: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListeLieuxPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ListeLieuxPage);
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

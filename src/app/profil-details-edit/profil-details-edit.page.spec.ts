import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ProfilDetailsEditPage} from './profil-details-edit.page';

describe('ProfilDetailsEditPage', () => {
    let component: ProfilDetailsEditPage;
    let fixture: ComponentFixture<ProfilDetailsEditPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfilDetailsEditPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfilDetailsEditPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

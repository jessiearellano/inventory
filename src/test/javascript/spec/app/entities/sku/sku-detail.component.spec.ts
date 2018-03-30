/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { InventoryTestModule } from '../../../test.module';
import { SkuDetailComponent } from '../../../../../../main/webapp/app/entities/sku/sku-detail.component';
import { SkuService } from '../../../../../../main/webapp/app/entities/sku/sku.service';
import { Sku } from '../../../../../../main/webapp/app/entities/sku/sku.model';

describe('Component Tests', () => {

    describe('Sku Management Detail Component', () => {
        let comp: SkuDetailComponent;
        let fixture: ComponentFixture<SkuDetailComponent>;
        let service: SkuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [SkuDetailComponent],
                providers: [
                    SkuService
                ]
            })
            .overrideTemplate(SkuDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkuDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Sku(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sku).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { InventoryTestModule } from '../../../test.module';
import { StoreSkuDetailComponent } from '../../../../../../main/webapp/app/entities/store-sku/store-sku-detail.component';
import { StoreSkuService } from '../../../../../../main/webapp/app/entities/store-sku/store-sku.service';
import { StoreSku } from '../../../../../../main/webapp/app/entities/store-sku/store-sku.model';

describe('Component Tests', () => {

    describe('StoreSku Management Detail Component', () => {
        let comp: StoreSkuDetailComponent;
        let fixture: ComponentFixture<StoreSkuDetailComponent>;
        let service: StoreSkuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [StoreSkuDetailComponent],
                providers: [
                    StoreSkuService
                ]
            })
            .overrideTemplate(StoreSkuDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreSkuDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreSkuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StoreSku(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.storeSku).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

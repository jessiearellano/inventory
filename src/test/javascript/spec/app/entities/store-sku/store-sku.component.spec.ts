/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InventoryTestModule } from '../../../test.module';
import { StoreSkuComponent } from '../../../../../../main/webapp/app/entities/store-sku/store-sku.component';
import { StoreSkuService } from '../../../../../../main/webapp/app/entities/store-sku/store-sku.service';
import { StoreSku } from '../../../../../../main/webapp/app/entities/store-sku/store-sku.model';

describe('Component Tests', () => {

    describe('StoreSku Management Component', () => {
        let comp: StoreSkuComponent;
        let fixture: ComponentFixture<StoreSkuComponent>;
        let service: StoreSkuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [StoreSkuComponent],
                providers: [
                    StoreSkuService
                ]
            })
            .overrideTemplate(StoreSkuComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreSkuComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreSkuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StoreSku(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.storeSkus[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

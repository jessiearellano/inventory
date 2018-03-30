/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InventoryTestModule } from '../../../test.module';
import { SkuComponent } from '../../../../../../main/webapp/app/entities/sku/sku.component';
import { SkuService } from '../../../../../../main/webapp/app/entities/sku/sku.service';
import { Sku } from '../../../../../../main/webapp/app/entities/sku/sku.model';

describe('Component Tests', () => {

    describe('Sku Management Component', () => {
        let comp: SkuComponent;
        let fixture: ComponentFixture<SkuComponent>;
        let service: SkuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [SkuComponent],
                providers: [
                    SkuService
                ]
            })
            .overrideTemplate(SkuComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SkuComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SkuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Sku(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.skus[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

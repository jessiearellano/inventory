/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InventoryTestModule } from '../../../test.module';
import { StoreSkuDialogComponent } from '../../../../../../main/webapp/app/entities/store-sku/store-sku-dialog.component';
import { StoreSkuService } from '../../../../../../main/webapp/app/entities/store-sku/store-sku.service';
import { StoreSku } from '../../../../../../main/webapp/app/entities/store-sku/store-sku.model';
import { StoreService } from '../../../../../../main/webapp/app/entities/store';
import { SkuService } from '../../../../../../main/webapp/app/entities/sku';

describe('Component Tests', () => {

    describe('StoreSku Management Dialog Component', () => {
        let comp: StoreSkuDialogComponent;
        let fixture: ComponentFixture<StoreSkuDialogComponent>;
        let service: StoreSkuService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [StoreSkuDialogComponent],
                providers: [
                    StoreService,
                    SkuService,
                    StoreSkuService
                ]
            })
            .overrideTemplate(StoreSkuDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreSkuDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreSkuService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StoreSku(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.storeSku = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'storeSkuListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StoreSku();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.storeSku = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'storeSkuListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { InventoryTestModule } from '../../../test.module';
import { StoreSkuDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/store-sku/store-sku-delete-dialog.component';
import { StoreSkuService } from '../../../../../../main/webapp/app/entities/store-sku/store-sku.service';

describe('Component Tests', () => {

    describe('StoreSku Management Delete Component', () => {
        let comp: StoreSkuDeleteDialogComponent;
        let fixture: ComponentFixture<StoreSkuDeleteDialogComponent>;
        let service: StoreSkuService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [InventoryTestModule],
                declarations: [StoreSkuDeleteDialogComponent],
                providers: [
                    StoreSkuService
                ]
            })
            .overrideTemplate(StoreSkuDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StoreSkuDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoreSkuService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

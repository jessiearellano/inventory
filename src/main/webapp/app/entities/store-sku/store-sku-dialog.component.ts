import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StoreSku } from './store-sku.model';
import { StoreSkuPopupService } from './store-sku-popup.service';
import { StoreSkuService } from './store-sku.service';
import { Store, StoreService } from '../store';
import { Sku, SkuService } from '../sku';

@Component({
    selector: 'jhi-store-sku-dialog',
    templateUrl: './store-sku-dialog.component.html'
})
export class StoreSkuDialogComponent implements OnInit {

    storeSku: StoreSku;
    isSaving: boolean;

    stores: Store[];

    skus: Sku[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private storeSkuService: StoreSkuService,
        private storeService: StoreService,
        private skuService: SkuService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.storeService.query()
            .subscribe((res: HttpResponse<Store[]>) => { this.stores = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.skuService.query()
            .subscribe((res: HttpResponse<Sku[]>) => { this.skus = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.storeSku.id !== undefined) {
            this.subscribeToSaveResponse(
                this.storeSkuService.update(this.storeSku));
        } else {
            this.subscribeToSaveResponse(
                this.storeSkuService.create(this.storeSku));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StoreSku>>) {
        result.subscribe((res: HttpResponse<StoreSku>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StoreSku) {
        this.eventManager.broadcast({ name: 'storeSkuListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStoreById(index: number, item: Store) {
        return item.id;
    }

    trackSkuById(index: number, item: Sku) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-store-sku-popup',
    template: ''
})
export class StoreSkuPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storeSkuPopupService: StoreSkuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.storeSkuPopupService
                    .open(StoreSkuDialogComponent as Component, params['id']);
            } else {
                this.storeSkuPopupService
                    .open(StoreSkuDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

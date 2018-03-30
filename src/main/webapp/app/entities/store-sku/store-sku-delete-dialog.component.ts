import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StoreSku } from './store-sku.model';
import { StoreSkuPopupService } from './store-sku-popup.service';
import { StoreSkuService } from './store-sku.service';

@Component({
    selector: 'jhi-store-sku-delete-dialog',
    templateUrl: './store-sku-delete-dialog.component.html'
})
export class StoreSkuDeleteDialogComponent {

    storeSku: StoreSku;

    constructor(
        private storeSkuService: StoreSkuService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.storeSkuService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'storeSkuListModification',
                content: 'Deleted an storeSku'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-store-sku-delete-popup',
    template: ''
})
export class StoreSkuDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storeSkuPopupService: StoreSkuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.storeSkuPopupService
                .open(StoreSkuDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

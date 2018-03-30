import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StoreSku } from './store-sku.model';
import { StoreSkuService } from './store-sku.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-store-sku',
    templateUrl: './store-sku.component.html'
})
export class StoreSkuComponent implements OnInit, OnDestroy {
storeSkus: StoreSku[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private storeSkuService: StoreSkuService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.storeSkuService.query().subscribe(
            (res: HttpResponse<StoreSku[]>) => {
                this.storeSkus = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInStoreSkus();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: StoreSku) {
        return item.id;
    }
    registerChangeInStoreSkus() {
        this.eventSubscriber = this.eventManager.subscribe('storeSkuListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

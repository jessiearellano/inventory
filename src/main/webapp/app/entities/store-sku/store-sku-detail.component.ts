import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StoreSku } from './store-sku.model';
import { StoreSkuService } from './store-sku.service';

@Component({
    selector: 'jhi-store-sku-detail',
    templateUrl: './store-sku-detail.component.html'
})
export class StoreSkuDetailComponent implements OnInit, OnDestroy {

    storeSku: StoreSku;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private storeSkuService: StoreSkuService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStoreSkus();
    }

    load(id) {
        this.storeSkuService.find(id)
            .subscribe((storeSkuResponse: HttpResponse<StoreSku>) => {
                this.storeSku = storeSkuResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStoreSkus() {
        this.eventSubscriber = this.eventManager.subscribe(
            'storeSkuListModification',
            (response) => this.load(this.storeSku.id)
        );
    }
}

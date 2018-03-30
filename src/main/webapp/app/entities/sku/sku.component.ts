import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Sku } from './sku.model';
import { SkuService } from './sku.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-sku',
    templateUrl: './sku.component.html'
})
export class SkuComponent implements OnInit, OnDestroy {
skus: Sku[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private skuService: SkuService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.skuService.query().subscribe(
            (res: HttpResponse<Sku[]>) => {
                this.skus = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSkus();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Sku) {
        return item.id;
    }
    registerChangeInSkus() {
        this.eventSubscriber = this.eventManager.subscribe('skuListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Sku } from './sku.model';
import { SkuPopupService } from './sku-popup.service';
import { SkuService } from './sku.service';

@Component({
    selector: 'jhi-sku-dialog',
    templateUrl: './sku-dialog.component.html'
})
export class SkuDialogComponent implements OnInit {

    sku: Sku;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private skuService: SkuService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sku.id !== undefined) {
            this.subscribeToSaveResponse(
                this.skuService.update(this.sku));
        } else {
            this.subscribeToSaveResponse(
                this.skuService.create(this.sku));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Sku>>) {
        result.subscribe((res: HttpResponse<Sku>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Sku) {
        this.eventManager.broadcast({ name: 'skuListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-sku-popup',
    template: ''
})
export class SkuPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skuPopupService: SkuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.skuPopupService
                    .open(SkuDialogComponent as Component, params['id']);
            } else {
                this.skuPopupService
                    .open(SkuDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Store } from './store.model';
import { StorePopupService } from './store-popup.service';
import { StoreService } from './store.service';

@Component({
    selector: 'jhi-store-dialog',
    templateUrl: './store-dialog.component.html'
})
export class StoreDialogComponent implements OnInit {

    store: Store;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private storeService: StoreService,
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
        if (this.store.id !== undefined) {
            this.subscribeToSaveResponse(
                this.storeService.update(this.store));
        } else {
            this.subscribeToSaveResponse(
                this.storeService.create(this.store));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Store>>) {
        result.subscribe((res: HttpResponse<Store>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Store) {
        this.eventManager.broadcast({ name: 'storeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-store-popup',
    template: ''
})
export class StorePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private storePopupService: StorePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.storePopupService
                    .open(StoreDialogComponent as Component, params['id']);
            } else {
                this.storePopupService
                    .open(StoreDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

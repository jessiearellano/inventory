import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InventorySharedModule } from '../../shared';
import {
    StoreSkuService,
    StoreSkuPopupService,
    StoreSkuComponent,
    StoreSkuDetailComponent,
    StoreSkuDialogComponent,
    StoreSkuPopupComponent,
    StoreSkuDeletePopupComponent,
    StoreSkuDeleteDialogComponent,
    storeSkuRoute,
    storeSkuPopupRoute,
} from './';

const ENTITY_STATES = [
    ...storeSkuRoute,
    ...storeSkuPopupRoute,
];

@NgModule({
    imports: [
        InventorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StoreSkuComponent,
        StoreSkuDetailComponent,
        StoreSkuDialogComponent,
        StoreSkuDeleteDialogComponent,
        StoreSkuPopupComponent,
        StoreSkuDeletePopupComponent,
    ],
    entryComponents: [
        StoreSkuComponent,
        StoreSkuDialogComponent,
        StoreSkuPopupComponent,
        StoreSkuDeleteDialogComponent,
        StoreSkuDeletePopupComponent,
    ],
    providers: [
        StoreSkuService,
        StoreSkuPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventoryStoreSkuModule {}

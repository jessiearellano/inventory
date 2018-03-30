import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InventorySharedModule } from '../../shared';
import {
    SkuService,
    SkuPopupService,
    SkuComponent,
    SkuDetailComponent,
    SkuDialogComponent,
    SkuPopupComponent,
    SkuDeletePopupComponent,
    SkuDeleteDialogComponent,
    skuRoute,
    skuPopupRoute,
} from './';

const ENTITY_STATES = [
    ...skuRoute,
    ...skuPopupRoute,
];

@NgModule({
    imports: [
        InventorySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SkuComponent,
        SkuDetailComponent,
        SkuDialogComponent,
        SkuDeleteDialogComponent,
        SkuPopupComponent,
        SkuDeletePopupComponent,
    ],
    entryComponents: [
        SkuComponent,
        SkuDialogComponent,
        SkuPopupComponent,
        SkuDeleteDialogComponent,
        SkuDeletePopupComponent,
    ],
    providers: [
        SkuService,
        SkuPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventorySkuModule {}

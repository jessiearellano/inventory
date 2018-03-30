import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { InventorySkuModule } from './sku/sku.module';
import { InventoryStoreModule } from './store/store.module';
import { InventoryStoreSkuModule } from './store-sku/store-sku.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        InventorySkuModule,
        InventoryStoreModule,
        InventoryStoreSkuModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InventoryEntityModule {}

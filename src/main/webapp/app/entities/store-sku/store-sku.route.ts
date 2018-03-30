import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StoreSkuComponent } from './store-sku.component';
import { StoreSkuDetailComponent } from './store-sku-detail.component';
import { StoreSkuPopupComponent } from './store-sku-dialog.component';
import { StoreSkuDeletePopupComponent } from './store-sku-delete-dialog.component';

export const storeSkuRoute: Routes = [
    {
        path: 'store-sku',
        component: StoreSkuComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.storeSku.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'store-sku/:id',
        component: StoreSkuDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.storeSku.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const storeSkuPopupRoute: Routes = [
    {
        path: 'store-sku-new',
        component: StoreSkuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.storeSku.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'store-sku/:id/edit',
        component: StoreSkuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.storeSku.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'store-sku/:id/delete',
        component: StoreSkuDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.storeSku.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

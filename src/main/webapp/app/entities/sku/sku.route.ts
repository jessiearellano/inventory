import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SkuComponent } from './sku.component';
import { SkuDetailComponent } from './sku-detail.component';
import { SkuPopupComponent } from './sku-dialog.component';
import { SkuDeletePopupComponent } from './sku-delete-dialog.component';

export const skuRoute: Routes = [
    {
        path: 'sku',
        component: SkuComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.sku.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sku/:id',
        component: SkuDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.sku.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const skuPopupRoute: Routes = [
    {
        path: 'sku-new',
        component: SkuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.sku.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sku/:id/edit',
        component: SkuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.sku.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sku/:id/delete',
        component: SkuDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'inventoryApp.sku.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

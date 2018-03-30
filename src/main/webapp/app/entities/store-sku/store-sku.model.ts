import { BaseEntity } from './../../shared';

export class StoreSku implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public store?: BaseEntity,
        public sku?: BaseEntity,
    ) {
    }
}

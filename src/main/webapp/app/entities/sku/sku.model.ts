import { BaseEntity } from './../../shared';

export class Sku implements BaseEntity {
    constructor(
        public id?: number,
        public skuId?: string,
        public name?: string,
        public uom?: string,
        public unitsPerUom?: number,
        public category?: string,
        public cost?: number,
        public tags?: string,
        public items?: BaseEntity[],
    ) {
    }
}

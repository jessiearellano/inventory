import { BaseEntity } from './../../shared';

export class Store implements BaseEntity {
    constructor(
        public id?: number,
        public storeId?: string,
        public name?: string,
        public phoneNumber?: string,
        public storeNumber?: string,
        public items?: BaseEntity[],
    ) {
    }
}

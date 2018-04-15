import { BaseEntity, User } from './../../shared';

export class UserExtra implements BaseEntity {
    constructor(
        public id?: number,
        public storename?: string,
        public user?: User,
    ) {
    }
}

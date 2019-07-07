import { Model } from "../base/model/Model";

export interface OwnerConstructor {
    id?: number | null;
    name?: string;
}

export class Owner extends Model {
    id: number | null = null;
    name: string = '';

    constructor(owner: OwnerConstructor = {}) {
        super({uri: 'owners'});

        this.id = owner.id || null;
        this.name = owner.name || '';
    }
}

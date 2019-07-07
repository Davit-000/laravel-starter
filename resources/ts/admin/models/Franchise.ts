import { Model } from "../base/model/Model";
import { Owner, OwnerConstructor} from "./Owner";

export interface FranchiseConstructor {
    id?: number | null;
    name?: string
    owner?: OwnerConstructor
}

export class Franchise extends Model {
    id: number | null = null;
    name: string = '';
    owner: object = {};

    constructor(franchise: FranchiseConstructor = {}) {
        super({uri: 'franchises'});

        this.id = franchise.id || null;
        this.name = franchise.name || '';
        this.owner = super.hasOne(Owner, franchise.owner || {});
    }
}

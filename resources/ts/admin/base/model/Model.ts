import * as _ from "lodash";
import pluralize from 'pluralize';
import { ModelProvider } from "./ModelProvider";
import { ServiceConstructor } from "../service/Service";

export class Model extends ModelProvider {
    protected relations: string[] = [];

    constructor(request: ServiceConstructor) {
        super(request);
    }

    hasOne(child: any, resource: object): object {
        this.relations.push(_.camelCase(child.prototype.constructor.name));

        return new child(resource);
    }

    hasMany(child: any, resources: []): object[] {
        this.relations.push(_.camelCase(pluralize.plural(child.prototype.constructor.name)));

        return resources.map(item => new child(item));
    }
}

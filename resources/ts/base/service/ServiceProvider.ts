import pluralize from 'pluralize'
import { ServiceConstructor } from "./ServiceConstructor";

export abstract class ServiceProvider {
    private reg:RegExp = /{\w+}/g;

    private readonly group: string = '';

    private readonly prefix: string = '';

    private readonly uri: string = '';

    protected constructor(config: ServiceConstructor) {
        this.uri = config.uri;
        this.prefix = config.prefix || '';
        this.group = config.group || '';
    }

    private isParamsCorrect(params:  object, url: string): boolean | Error {
        let matches = url.match(this.reg);

        if (!matches) return true;

        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                if (!matches.includes(`{${key}}`)) {
                    throw new Error(`Missing required route parameter: {${key}}`);
                }

                if (!params[key]) {
                    throw new Error(`Not correct route parameter for {${key}}`)
                }
            }
        }

        return true;
    }

    private setPathParameters(params: object, url: string): string {
        if (this.isParamsCorrect(params, url)) {
            for (let key in params) {
                if (params.hasOwnProperty(key)) {
                    let reg = new RegExp(`{${key}}`);

                    url = url.replace(reg, params[key]);
                }
            }
        }

        return window.location.origin + '/' + url;
    }

    private path(parameterised: boolean, urlEnd: boolean | string): string {
        return '/'
            + (this.group ? `${this.group}/` : '')
            + (this.prefix ? `${this.prefix}/` : '')
            + this.uri
            + (parameterised ? `/{${pluralize.singular(this.uri)}}` : '')
            + (urlEnd ? `/${urlEnd}` : '');
    }

    protected url(params: Object, parameterised: boolean = false, urlEnd: boolean | string = false): string {
        return this.setPathParameters(params, this.path(parameterised, urlEnd));
    }
}

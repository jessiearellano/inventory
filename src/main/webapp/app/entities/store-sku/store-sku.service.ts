import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { StoreSku } from './store-sku.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StoreSku>;

@Injectable()
export class StoreSkuService {

    private resourceUrl =  SERVER_API_URL + 'api/store-skus';

    constructor(private http: HttpClient) { }

    create(storeSku: StoreSku): Observable<EntityResponseType> {
        const copy = this.convert(storeSku);
        return this.http.post<StoreSku>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(storeSku: StoreSku): Observable<EntityResponseType> {
        const copy = this.convert(storeSku);
        return this.http.put<StoreSku>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StoreSku>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StoreSku[]>> {
        const options = createRequestOption(req);
        return this.http.get<StoreSku[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StoreSku[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StoreSku = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StoreSku[]>): HttpResponse<StoreSku[]> {
        const jsonResponse: StoreSku[] = res.body;
        const body: StoreSku[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StoreSku.
     */
    private convertItemFromServer(storeSku: StoreSku): StoreSku {
        const copy: StoreSku = Object.assign({}, storeSku);
        return copy;
    }

    /**
     * Convert a StoreSku to a JSON which can be sent to the server.
     */
    private convert(storeSku: StoreSku): StoreSku {
        const copy: StoreSku = Object.assign({}, storeSku);
        return copy;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Sku } from './sku.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Sku>;

@Injectable()
export class SkuService {

    private resourceUrl =  SERVER_API_URL + 'api/skus';

    constructor(private http: HttpClient) { }

    create(sku: Sku): Observable<EntityResponseType> {
        const copy = this.convert(sku);
        return this.http.post<Sku>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(sku: Sku): Observable<EntityResponseType> {
        const copy = this.convert(sku);
        return this.http.put<Sku>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Sku>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Sku[]>> {
        const options = createRequestOption(req);
        return this.http.get<Sku[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Sku[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Sku = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Sku[]>): HttpResponse<Sku[]> {
        const jsonResponse: Sku[] = res.body;
        const body: Sku[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Sku.
     */
    private convertItemFromServer(sku: Sku): Sku {
        const copy: Sku = Object.assign({}, sku);
        return copy;
    }

    /**
     * Convert a Sku to a JSON which can be sent to the server.
     */
    private convert(sku: Sku): Sku {
        const copy: Sku = Object.assign({}, sku);
        return copy;
    }
}

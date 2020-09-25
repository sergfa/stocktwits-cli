import axios, { AxiosResponse } from 'axios';
import { from, Observable, of, throwError } from 'rxjs';
import { map, switchMap, delay, concatMap, reduce, tap } from 'rxjs/operators';
import { StreamsProductType, StreamsResponseData } from '../models/streams.model';
import { Message, Symbol } from './../models/common.model';
import { ResponseData } from './../models/response.model';
import { TrendingProductType, TrendingResponseData } from './../models/trending.model';

const BASE_URL = 'https://api.stocktwits.com/api/2';

const RATE_LIMIT = 500;

export class StockWitsDataProviderService {
  constructor() {}

  getTrendingData(product: TrendingProductType): Observable<Symbol[]> {
    const prodURL = this.getTrendingProductURL(product);
    return from(axios.get(`${BASE_URL}${prodURL}`)).pipe(
      switchMap((response) => this.handleResponse(response)),
      map((response) => (<TrendingResponseData>response).symbols)
    );
  }

  getStreamsData(product: StreamsProductType, data: string[]): Observable<Message[]> {
    switch (product) {
      case StreamsProductType.TRENDING_EQUITIES:
        return this.getTrendingMessages(TrendingProductType.EQUITIES);
      case StreamsProductType.SYMBOL:
        return this.getMessagesBySymbols(data);
      case StreamsProductType.USER:
        return this.getMessagesByUser(data[0]);
      case StreamsProductType.SUGGESTED:
        return this.getMessagesBySuggestedUsers();
    }
  }

  private getMessagesBySymbol(symbol: string): Observable<Message[]> {
    const prodURL = `/streams/symbol/${symbol}.json`;
    return from(axios.get(`${BASE_URL}${prodURL}`)).pipe(
      switchMap((response) => this.handleResponse(response)),
      map((response) => (<StreamsResponseData>response).messages)
    );
  }

  private getMessagesByUser(id: string): Observable<Message[]> {
    const prodURL = `/streams/user/${id}.json`;
    return from(axios.get(`${BASE_URL}${prodURL}`)).pipe(
      switchMap((response) => this.handleResponse(response)),
      map((response) => (<StreamsResponseData>response).messages)
    );
  }

  private getMessagesBySuggestedUsers(): Observable<Message[]> {
    const prodURL = `/streams/suggested.json`;
    return from(axios.get(`${BASE_URL}${prodURL}`)).pipe(
      switchMap((response) => this.handleResponse(response)),
      map((response) => (<StreamsResponseData>response).messages)
    );
  }

  private getMessagesBySymbols(symbols: string[]) {
    return from(symbols).pipe(
      concatMap((symbol: string) => this.getMessagesBySymbol(symbol).pipe(delay(RATE_LIMIT))),
      reduce((acc, res) => {
        acc.push(...res);
        return acc;
      }, [] as Message[])
    );
  }

  getTrendingMessages(product: TrendingProductType): Observable<Message[]> {
    return this.getTrendingData(product).pipe(
      delay(RATE_LIMIT),
      switchMap((symbols: Symbol[]) => from(symbols)),
      concatMap((symbol: Symbol) => this.getMessagesBySymbol(symbol.symbol).pipe(delay(RATE_LIMIT))),
      reduce((acc, res) => {
        acc.push(...res);
        return acc;
      }, [] as Message[])
    );
  }

  private getTrendingProductURL(product: TrendingProductType): string {
    let url: string;
    switch (product) {
      case TrendingProductType.SYMBOLS:
        url = '/trending/symbols.json';
        break;
      case TrendingProductType.EQUITIES:
        url = '/trending/symbols/equities.json';
        break;
      default:
        url = '/trending/symbols.json';
    }
    return url;
  }

  private handleResponse(response: AxiosResponse<ResponseData>): Observable<ResponseData> {
    if (response.data.response.status === 200) {
      return of(response.data);
    } else {
      return throwError(new Error(response.data.errors ? response.data.errors[0].message : 'Unknown error'));
    }
  }
}

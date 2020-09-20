import { ResponseData } from './response.model';
import { Symbol } from './common.model';

export interface TrendingResponseData extends ResponseData {
  symbols: Symbol[];
}

export enum TrendingProductType {
  SYMBOLS = 'symbols',
  EQUITIES = 'equities'
}

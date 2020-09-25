import { Message } from './common.model';
import { ResponseData } from './response.model';

export enum StreamsProductType {
  SYMBOL = 'symbol',
  TRENDING_EQUITIES = 'trending',
  USER = 'user',
  SUGGESTED = 'suggested'
}

export interface StreamsResponseData extends ResponseData {
  messages: Message[];
}

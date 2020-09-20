export interface Symbol {
  id: number;
  symbol: string;
  title: string;
  aliases: string[];
  is_following: boolean;
  watchlist_count: number;
}

export interface User {
  id: number;
  username: string;
  name: string;
  avatar_url: string;
  avatar_url_ssl: string;
  join_date: string;
  official: boolean;
  identity: string;
  classification: any[];
  followers: number;
  following: number;
  ideas: number;
  watchlist_stocks_count: number;
  like_count: number;
  plus_tier: string;
  premium_room: string;
  trade_app: boolean;
}

export interface Source {
  id: number;
  title: string;
  url: string;
}

export interface Sentiment {
  basic: string;
}

export interface Entities {
  sentiment: Sentiment;
}

export interface Filters {
  day_counts: number;
  official_api: boolean;
}

export interface Message {
  id: number;
  body: string;
  created_at: Date;
  user: User;
  source: Source;
  symbols: Symbol[];
  mentioned_users: any[];
  entities: Entities;
  filters: Filters;
}

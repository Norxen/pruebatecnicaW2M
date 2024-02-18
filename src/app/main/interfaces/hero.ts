export interface Hero {
  id: number;
  name: string;
  subtitle: string;
  color: string;
}

export interface HeroSearchResponse {
  heroes: Hero[];
  total: number;
}

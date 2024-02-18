import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero, HeroSearchResponse } from '../../interfaces/hero';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HeroServiceWithApiService {
  heroesUrl = environment.apiUrl;

  private heroes$ = new BehaviorSubject<Hero[]>([]);
  private selectedHero$ = new BehaviorSubject<Hero | undefined>(undefined);

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.heroes$.asObservable();
  }

  refreshHeroes(heroes: Hero[]): void {
    this.heroes$.next(heroes);
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url);
  }

  addHero(hero: Hero): Observable<Hero[]> {
    return this.http.post<Hero[]>(this.heroesUrl, hero);
  }

  updateHero(hero: Hero): Observable<Hero[]> {
    const url = `${this.heroesUrl}/update/${hero.id}`;
    return this.http.put<Hero[]>(url, hero);
  }

  deleteHero(id: number): Observable<Hero[]> {
    const url = `${this.heroesUrl}/delete/${id}`;
    return this.http.delete<Hero[]>(url);
  }

  searchHeroes(
    name: string,
    page: number,
    limit: number
  ): Observable<HeroSearchResponse> {
    const url = `${this.heroesUrl}/search?name=${name}&page=${page}&limit=${limit}`;
    return this.http.get<HeroSearchResponse>(url);
  }

  setSelectedHero(hero: Hero): void {
    this.selectedHero$.next(hero);
  }

  getSelectedHero(): Observable<Hero | undefined> {
    return this.selectedHero$.asObservable();
  }
}

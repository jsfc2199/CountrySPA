import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { CacheStore, Country, Region } from '../interfaces';


@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiURL: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries:[] },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage()
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiURL}/capital/${term}`)
    .pipe(
      //tap sirve para efectos secundarios y no influye en lo que retorna el operador. Solo es para alterar otros valores fuera de este
      tap( countries => this.cacheStore.byCapital = { term,  countries}),
      tap( ()  => this.saveToLocalStorage())
    );
  }

  searchRegion(term: Region): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiURL}/region/${term}`)
    .pipe(
      tap( countries => this.cacheStore.byRegion = { region: term,  countries}),
      tap( ()  => this.saveToLocalStorage())
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiURL}/name/${term}`)
    .pipe(
      tap( countries => this.cacheStore.byCountries = { term,  countries}),
      tap( ()  => this.saveToLocalStorage())
    );
  }

  //genérico para refactorizar
  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiURL}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError((error) => of([]))
      // delay(2000), //ya no lo ocupamos por el debounce
    );
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }
}

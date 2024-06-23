import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiURL:string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

  searchCapital(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiURL}/capital/${term}`)
  }

  searchRegion(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiURL}/region/${term}`)
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.getCountriesRequest(`${this.apiURL}/name/${term}`)
  }

  //genérico para refactorizar
  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiURL}/alpha/${code}`)
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError(error => of(null))
    )
  }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(error => of([])),
      delay(2000),
    )
  }
}

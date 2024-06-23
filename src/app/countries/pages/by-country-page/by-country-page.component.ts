import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  countries: Country[] = []
  constructor(private countriesService: CountriesService){}
  public countriesSubscription: Subscription = new Subscription

  searchByCountry(term: string){
    this.countriesSubscription = this.countriesService.searchCountry(term)
    .subscribe((countries) => {
      this.countries = countries
    })
  }

  ngOnDestroy(): void {
   this.countriesSubscription.unsubscribe()
  }
}

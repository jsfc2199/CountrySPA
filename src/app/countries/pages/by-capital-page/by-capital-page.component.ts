import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {

  constructor(private countriesService: CountriesService){}

  public countries: Country[] = []

  public countriesSubscription: Subscription = new Subscription
  isLoading: boolean = false

  searchByCapital(term: string){
    this.isLoading = true
    this.countriesSubscription = this.countriesService.searchCapital(term)
    .subscribe((countries) => {
      this.countries = countries
      this.isLoading = false
    })
  }

  ngOnDestroy(): void {
   this.countriesSubscription.unsubscribe()
  }
}

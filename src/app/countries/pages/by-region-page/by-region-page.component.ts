import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countries: Country[] = []
  constructor(private countriesService: CountriesService){}
  public countriesSubscription: Subscription = new Subscription

  searchByRegion(term: string){
    this.countriesSubscription = this.countriesService.searchRegion(term)
    .subscribe((countries) => {
      this.countries = countries
    })
  }

  ngOnDestroy(): void {
   this.countriesSubscription.unsubscribe()
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService) {}

  country?: Country
  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      //switch map recibe el valor anterior "params" y regresa un nuevo observable
      //es decir no estamos suscribiendo al resultado del observable que llame el switch map
      switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id))
    )
    .subscribe((country) =>{
      if(!country){
        return this.router.navigateByUrl('')
      }

      return this.country=country

    });
  }
}

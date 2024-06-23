import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {
  constructor() {}

  //observable "manual"
  private debouncer: Subject<string> = new Subject();

  ngOnInit(): void {
    this.debouncer
    .pipe(
      debounceTime(500) //si por 2 segundos no se emiten valores, lo emitirá con lo que haya
    )
    .subscribe(value => {
      this.onDebounce.emit(value)
    })
  }

  @Input()
  placeholder: string = '';

  @Output()
  onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter();

  emitValue(term: string) {
    this.onValue.emit(term);
  }

  onKeyPress(term: string) {
    //debounce para que si el usuario escribe pero no da enter, al cabo de un tiempo haga la búsqueda
    this.debouncer.next(term)
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {

  constructor() { }

  @Input()
  placeholder: string = ''

  @Output()
  onValue: EventEmitter<string> = new EventEmitter();

  emitValue(term: string){
    this.onValue.emit(term)
  }

}

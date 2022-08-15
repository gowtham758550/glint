import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchBar } from 'src/app/data/models/search-bar.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {

  @Input()
  searchBarData!: SearchBar[];
  @Input()
  form!: FormGroup;
  @Output()
  dataEmitter = new EventEmitter();
  isFirstOption: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
  }

  selectOnChange(event: any) {
    if (event.target.value == 0) this.isFirstOption = true;
    else this.isFirstOption = false;
  }

  emitData() {
    this.dataEmitter.emit();
  }

}

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unicef';
  abbrevationsList:any;
  selectedItem:any;
  searchTerm:any;
  fullDataWithoutFilter:any;
  constructor(private http: HttpClient) {
    this.selectedItem = ''; //higlighted the selected acronym
    this.searchTerm = ''; //ngModel variable to store the value
    //Getting the list of acronyms from an api
    this.http.get('http://unacronyms.herokuapp.com/acronyms').subscribe(res => {
      console.warn('res', res);
      this.abbrevationsList = res; //appended the list of acronyms
      this.fullDataWithoutFilter = res; // re assigned the values when emptying the string
    }, error => {
      console.error('error', error);
      error.json();
    })
  }

  listClick(event, newValue) {
    console.log(newValue);
    this.selectedItem = newValue;
  }

  filterItems(searchTerm){ //filtering the list of items based on search results
    return this.abbrevationsList.filter((item) => {
      return item.expanded.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || item.acronym.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  };
  setFilteredItems() {
    console.info('step 1', this.searchTerm);
    if (this.searchTerm === '' || this.searchTerm.length === 0) {
      this.abbrevationsList = this.fullDataWithoutFilter;
    } else {
      this.abbrevationsList = this.filterItems(this.searchTerm);
    }
  };
}

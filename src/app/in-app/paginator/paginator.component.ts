import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() items: Array<any>;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage: number = 1;
  @Input() pageSize: number = 6;
  private _numberOfPages: number;
  private _arrayOfnumbers: number[];
  viewItems: Array<any>;
  private _currentPage: number;

  get numberOfPages() {
    return this._numberOfPages;
  }
  get arrayOfnumbers() {
    return this._arrayOfnumbers;
  }
  get currentPage() {
    return this._currentPage;
  }
  ngOnInit(): void {
    // set page if items array isn't empty
    if (this.items && this.items.length) {
      this._numberOfPages = Math.ceil(this.items.length / this.pageSize);
      this._arrayOfnumbers = Array(this._numberOfPages);
      this._currentPage = this.initialPage;
      this.setPage(this._currentPage);

    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    if (changes.items.currentValue !== changes.items.previousValue) {
      this._numberOfPages = Math.ceil(this.items.length / this.pageSize);
      this._arrayOfnumbers = Array(this._numberOfPages);
      this._currentPage = this.initialPage;
      this.setPage(this._currentPage);
    }
  }

  setPage(page: number) {
    this.viewItems = this.items.slice((page - 1) * this.pageSize, page * this.pageSize);
    this._currentPage = page;
    this.changePage.emit(this.viewItems);
  }
}

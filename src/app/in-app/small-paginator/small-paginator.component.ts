import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnDestroy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-small-paginator',
  templateUrl: './small-paginator.component.html',
  styleUrls: ['./small-paginator.component.css']
})
export class SmallPaginatorComponent implements OnInit, OnChanges {
  @Input() items: Array<any>;
  @Output() changeSlide = new EventEmitter<any>(true);
  @Input() slideSize: number = 7;
  private _slidesCount: number;
  viewItems: Array<any>;
  private _currentSlide: number = 1;

  get slidesCount() {
    return this._slidesCount;
  }
  get currentSlide() {
    return this._currentSlide;
  }
  ngOnInit(): void {
    // set page if items array isn't empty
    if (this.items && this.items.length) {
      this._slidesCount = Math.ceil(this.items.length / this.slideSize);
      this.setSlide(this._currentSlide);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset slider if items array has changed
    if (changes.items.currentValue !== changes.items.previousValue) {
      this._slidesCount = Math.ceil(this.items.length / this.slideSize);
      this.setSlide(this._currentSlide);
    }
  }

  setSlide(slide: number) {
    this.viewItems = this.items.slice((slide - 1) * this.slideSize, slide * this.slideSize);
    this._currentSlide = slide;
    this.changeSlide.emit(this.viewItems);
  }
}


import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-hr-details',
  templateUrl: './hr-details.component.html',
  styleUrls: ['./hr-details.component.css']
})
export class HrDetailsComponent implements OnInit {
  show: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  onShow($event) {
    this.show = !this.show
    $event.stopPropagation();
  }
  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.show = false;
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-input',
  template: `
             <mat-form-field appearance="legacy" class="">
              <input matInput #descriptionElement [value]="description? description: ''" (keyup)="onDescriptionChange(descriptionElement.value)">
            </mat-form-field>
  `,
  styles: [
  ]
})
export class UserInputComponent implements OnInit {
  @Input() description: string;
  @Output() descriptionChanged: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onDescriptionChange(newDescription: string) {
    this.descriptionChanged.emit(newDescription);
  }
}

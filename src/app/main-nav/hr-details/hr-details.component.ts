import { Component, OnInit, HostListener } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { HRUser } from 'src/app/models/HRUser.model';

@Component({
  selector: 'app-hr-details',
  templateUrl: './hr-details.component.html',
  styleUrls: ['./hr-details.component.css']
})
export class HrDetailsComponent implements OnInit {
  show: boolean = false;
  activeHR: HRUser;
  constructor(private _utilsService: UtilsService) { }

  ngOnInit(): void {
    this.activeHR = this._utilsService.getActiveHR()
  }
  onShow($event) {
    this.show = !this.show
    $event.stopPropagation();
  }
  @HostListener('document:click', ['$event']) onDocumentClick(event) {
    this.show = false;
  }

  onLogout() {
    setTimeout(() => {
      this._utilsService.logout()
    }, 400);
  }
}

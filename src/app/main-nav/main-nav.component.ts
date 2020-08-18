import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  @ViewChild('logo') logoImg: ElementRef;
  logoImgSrc: string = '../../assets/imgs/HR_LOGO_white_noText.png';
  //  @ViewChild('nameContainer') nameContainer:ElementRef;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { }
  onMouseenterName() {
    this.logoImg.nativeElement.src = '../../assets/imgs/HR_LOGO_L_Purple-noText1.png';
  }
  onMouseleaveName() {
    this.logoImg.nativeElement.src = '../../assets/imgs/HR_LOGO_white_noText.png';
  }
}

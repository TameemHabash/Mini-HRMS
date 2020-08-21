import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  hide: boolean = true;
  validLogin: boolean = true;
  constructor(private _utilsService: UtilsService) { }

  ngOnInit(): void {
  }
  onLogin(username: string, password: string) {
    this.validLogin = this._utilsService.login(username, password);
  }

}

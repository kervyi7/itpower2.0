import { Component } from '@angular/core';
import { IAppConfig } from './interfaces/app-config';
import { AppConfigService } from './services/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isPopupVisible: boolean = false;
  public config: IAppConfig;

  constructor(private _appConfigService: AppConfigService) {
    this.config = _appConfigService.config;
  }

  public togglePopupVisibility(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }
}

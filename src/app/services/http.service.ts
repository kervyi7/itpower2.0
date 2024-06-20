import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAppConfig } from '../interfaces/app-config';
import { AppConfigService } from './app-config.service';

@Injectable()
export class HttpService {
  private _config: IAppConfig;

  constructor(private _http: HttpClient,
    private _appConfigService: AppConfigService) {
    this._config = _appConfigService.config;
  }

  public sendMessage(message: string): Observable<void> {
    const url = `https://api.telegram.org/bot${this._config.token}/sendMessage?chat_id=${this._config.chatId}&text=${message}`;
    return this._http.get<void>(url);
  }
}
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormComponent } from './components/form/form.component';
import { AppConfigService } from './services/app-config.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function init(appConfigService: AppConfigService): Function {
  return (): Promise<boolean> => appConfigService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormComponent,
    MainPageComponent,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: init,
    deps: [AppConfigService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

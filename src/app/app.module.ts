import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoggerModule, NgxLoggerLevel, NGXLogger } from 'ngx-logger';

import { HttpClientModule, HttpClient} from '@angular/common/http';

import { environment } from './../environments/environment';

import { MAT_DATE_LOCALE } from '@angular/material';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    }),
    LoggerModule.forRoot(
      { 
        level: NgxLoggerLevel.DEBUG
      }
    )
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: environment.defaultLang }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
      private translate: TranslateService,
      private logger: NGXLogger
  ) {
    this.translate.use(environment.defaultLang);
    this.logger.info('Language set to {{environment.defaultLang}}');
    this.logger.info('App Module initialized!');
  }
}

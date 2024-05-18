import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

const config: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule)
  ]
};

bootstrapApplication(AppComponent, config)
  .catch((err: Error) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routesConfig } from './routes';

bootstrapApplication(App, {
  providers: [
    provideRouter(routesConfig)
  ]
})
  .catch((err) => console.error(err));

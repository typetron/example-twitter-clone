import '@Typetron/Support'
import { enableProdMode, Injector } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'

if (environment.production) {
    enableProdMode()
}

export let appInjector: Injector

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(componentRef => {
        appInjector = componentRef.injector
    })
    .catch(err => console.error(err))


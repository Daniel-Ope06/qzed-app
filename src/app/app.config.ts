import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"qzedanswers","appId":"1:480821697239:web:3b5669ae2b60f87f3cae92","databaseURL":"https://qzedanswers-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"qzedanswers.appspot.com","apiKey":"AIzaSyAx3stvWudlLYGDDOfAyRROxfv0bO_rXCU","authDomain":"qzedanswers.firebaseapp.com","messagingSenderId":"480821697239","measurementId":"G-685DKXHY33"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};

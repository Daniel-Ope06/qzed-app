import { Routes } from '@angular/router';
import { LoginPageComponent } from './domains/login/ui/login-page/login-page.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        title: 'Login | QZed',
        component: LoginPageComponent
    }
];

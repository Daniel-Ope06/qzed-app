import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        title: 'Login | QZed',
        loadComponent: () => import('./domains/login/ui/login-page/login-page.component').then(c => c.LoginPageComponent)
    },
    {
        path: 'study/:uid',
        title: 'Study | QZed',
        loadComponent: () => import('./domains/study/ui/study-page/study-page.component').then(c => c.StudyPageComponent)
    }
];

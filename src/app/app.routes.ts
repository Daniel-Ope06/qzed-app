import { Routes } from '@angular/router';
import { redirectUnauthorizedTo, AuthGuard } from '@angular/fire/auth-guard';

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
        loadComponent: () => import('./domains/study/ui/study-page/study-page.component').then(c => c.StudyPageComponent),
        canActivate: [AuthGuard],
        data: { authGuardPipe: () => redirectUnauthorizedTo(['login']) },
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', title: 'Dashboard | QZed', loadComponent: () => import('./domains/study/feature/dashboard/dashboard.component').then(c => c.DashboardComponent) },
        ]
    }
];

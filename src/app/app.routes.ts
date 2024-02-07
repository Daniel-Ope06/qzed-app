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
            {
                path: 'question-bank',
                title: 'Question Bank | QZed',
                loadComponent: () => import('./domains/study/feature/question-bank/question-bank.component').then(c => c.QuestionBankComponent),
                children: [
                    { path: '', loadComponent: () => import('./domains/shared/ui/school-list/school-list.component').then(c => c.SchoolListComponent) },
                    { path: ':schoolId', loadComponent: () => import('./domains/study/feature/question-bank/course-list/course-list.component').then(c => c.CourseListComponent) },
                    { path: ':schoolId/:courseId', loadComponent: () => import('./domains/study/feature/question-bank/year-list/year-list.component').then(c => c.YearListComponent) },
                ]
            },
            {
                path: 'quiz',
                title: 'Quiz | QZed',
                loadComponent: () => import('./domains/study/feature/quiz/quiz.component').then(c => c.QuizComponent),
                children: [
                    { path: '', loadComponent: () => import('./domains/shared/ui/school-list/school-list.component').then(c => c.SchoolListComponent) },
                    { path: ':schoolId', loadComponent: () => import('./domains/study/feature/quiz/quiz-list/quiz-list.component').then(c => c.QuizListComponent) },
                ]
            },
        ]
    }
];

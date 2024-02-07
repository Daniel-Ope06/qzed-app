import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SchoolListComponent } from '../../../shared/ui/school-list/school-list.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  private router: Router = inject(Router);
  subscription!: Subscription;

  subscribeToEmitter(componentRef: Component) {
    if (componentRef instanceof SchoolListComponent) {
      const schoolList = componentRef as SchoolListComponent;
      schoolList.selectSchoolEvent.subscribe((schoolId) => {
        this.routeToQuizList(schoolId);
      });
    } else if (componentRef instanceof QuizListComponent) {
      const quizList = componentRef as QuizListComponent;
      this.subscription = quizList.selectQuizEvent.subscribe((courseId) => {
        this.routeToQuizTest(courseId);
      });
    }
  }

  unsubscribeFromEmitter() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  routeToQuizList(schoolId: string) {
    const currentRoute = this.router.url.substring(1);
    const segments = currentRoute.split('/');
    const uid = segments[1];
    this.router.navigate([`study/${uid}/quiz/${schoolId}`]);
  }

  routeToQuizTest(courseId: string) {
    const currentRoute = this.router.url.substring(1);
    const segments = currentRoute.split('/');
    const uid = segments[1];
    const schoolId = segments[3];
    this.router.navigate([`study/${uid}/quiz/${schoolId}/${courseId}`]);
  }

  isQuizTestComponent() {
    const currentRoute = this.router.url.substring(1);
    const segments = currentRoute.split('/');
    if (segments.length === 5) {
      return true;
    }
    return false;
  }
}

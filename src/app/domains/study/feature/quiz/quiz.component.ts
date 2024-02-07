import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { SchoolListComponent } from '../../../shared/ui/school-list/school-list.component';

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
}

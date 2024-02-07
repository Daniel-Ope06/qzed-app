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
        //this.routeToCourseList(schoolId);
      });
    }
  }

  unsubscribeFromEmitter() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SchoolListComponent } from '../../../shared/ui/school-list/school-list.component';
import { CourseListComponent } from './course-list/course-list.component';
import { Subscription } from 'rxjs';
import { YearListComponent } from './year-list/year-list.component';

@Component({
  selector: 'question-bank',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss'
})
export class QuestionBankComponent {
  private router: Router = inject(Router);
  subscription!: Subscription;

  subscribeToEmitter(componentRef: Component) {
    if (componentRef instanceof SchoolListComponent) {
      const schoolList = componentRef as SchoolListComponent;
      schoolList.selectSchoolEvent.subscribe((schoolId) => {
        this.routeToCourseList(schoolId);
      });
    } else if (componentRef instanceof CourseListComponent) {
      const courseList = componentRef as CourseListComponent;
      this.subscription = courseList.selectCourseEvent.subscribe((courseId) => {
        this.routeToYearList(courseId);
      });
    } else if (componentRef instanceof YearListComponent) {
      const yearList = componentRef as YearListComponent;
      yearList.selectYearEvent.subscribe((yearURL) => {
        window.open(yearURL, '_blank');
      });
    }
  }

  unsubscribeFromEmitter() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  routeToCourseList(schoolId: string) {
    const currentRoute = this.router.url.substring(1);
    const segments = currentRoute.split('/');
    const uid = segments[1];
    this.router.navigate([`study/${uid}/question-bank/${schoolId}`]);
  }

  routeToYearList(courseId: string) {
    const currentRoute = this.router.url.substring(1);
    const segments = currentRoute.split('/');
    const uid = segments[1];
    const schoolId = segments[3];
    this.router.navigate([`study/${uid}/question-bank/${schoolId}/${courseId}`]);
  }
}

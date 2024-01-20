import { Component, Input, inject } from '@angular/core';
import { ListComponent } from './list/list.component';
import { QuestionService } from '../../data-access/question.service';
import { Router, RouterModule } from '@angular/router';
import { SchoolListComponent } from './school-list/school-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'question-bank',
  standalone: true,
  imports: [ListComponent, RouterModule],
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.scss'
})
export class QuestionBankComponent {
  private router: Router = inject(Router);
  subscription!: Subscription;

  subscribeToEmitter(componentRef: Component) {
    if (componentRef instanceof SchoolListComponent) {
      const schoolList = componentRef as SchoolListComponent;
      schoolList.selectSchoolEvent.subscribe((id) => {
        this.routeToCourseList(id);
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
    this.router.navigate([`study/${uid}/question-bank/schools/${schoolId}`]);
  }


  @Input() section: string = 'schools';
  private questionService: QuestionService = inject(QuestionService);

  isGrid: boolean = false;
  items: {name:string, id:string}[] = [];
  schools: any[] = [];
  courses: any[] = [];


  



  async receiveId(id: string) {
    console.log(id);
    await this.getCourses(id);
    this.setItemsToCourses();
    console.log(this.courses);
  }

  async getSchools() {
    await this.questionService.getSchools().then((schools) => {
      this.schools = schools;
    });
  }

  async getCourses(schoolId: string) {
    await this.questionService.getCourses(schoolId).then((courses) => {
      this.courses = courses;
    });
  }

  setItemsToSchools() {
    this.items = [];
    if (this.isGrid) {
      this.schools.forEach((school) => {
        this.items.push({name: school.short_name, id: school.id});
      });
    } else {
      this.schools.forEach((school) => {
        this.items.push({name: school.full_name, id: school.id});
      });
    }
  }

  setItemsToCourses() {
    this.items = [];
    if (this.isGrid) {
      this.courses.forEach((course) => {
        this.items.push({name: course.code, id: course.id});
      });
    } else {
      this.courses.forEach((course) => {
        this.items.push({name: course.name, id: course.id});
      });
    }
  }
}

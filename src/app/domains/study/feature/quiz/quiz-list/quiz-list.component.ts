import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { SchoolService } from '../../../data-access/school.service';
import { ListComponent } from '../../../../shared/ui/list/list.component';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss'
})
export class QuizListComponent implements OnInit {
  @Input({required: true}) schoolId: string = '';
  @Output() selectQuizEvent = new EventEmitter<string>();

  private schoolService = inject(SchoolService);

  items: {long:string, short:string, id:string}[] = [];
  heading: string = '';

  async ngOnInit() {
    await this.schoolService.getSchoolName(this.schoolId).then((schoolName) => {
      this.heading = schoolName + ' quizzes';
    });
    await this.schoolService.getCourses(this.schoolId).then((courses) => {
      for (let course of courses) {
        if (course['quiz']) {
          this.items.push({long: course['name'], short: course['code'], id: course['id']});
        }
      }
    });
  }

  returnCourseId(id: string) {
    this.selectQuizEvent.emit(id);
  }
}

import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { QuestionService } from '../../../data-access/question.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent {
  @Input({required: true}) schoolId: string = '';
  @Output() selectCourseEvent = new EventEmitter<string>();

  private questionService = inject(QuestionService);

  items: {long:string, short:string, id:string}[] = [];
  heading: string = '';

  async ngOnInit() {
    await this.questionService.getCourses(this.schoolId).then((courses) => {
      for (let course of courses) {
        this.items.push({long: course['name'], short: course['code'], id: course['id']});
      }
    });
    await this.questionService.getSchoolName(this.schoolId).then((schoolName) => {
      this.heading = schoolName + ' courses';
    });
  }

  returnCourseId(id: string) {
    this.selectCourseEvent.emit(id);
  }
}

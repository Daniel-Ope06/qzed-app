import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { SchoolService } from '../../../data-access/school.service';
import { ListComponent } from '../../../../shared/ui/list/list.component';

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

  private schoolService = inject(SchoolService);

  items: {long:string, short:string, id:string}[] = [];
  heading: string = '';

  async ngOnInit() {
    await this.schoolService.getSchoolName(this.schoolId).then((schoolName) => {
      this.heading = schoolName + ' courses';
    });
    await this.schoolService.getCourses(this.schoolId).then((courses) => {
      for (let course of courses) {
        this.items.push({long: course['name'], short: course['code'], id: course['id']});
      }
    });
  }

  returnCourseId(id: string) {
    this.selectCourseEvent.emit(id);
  }
}

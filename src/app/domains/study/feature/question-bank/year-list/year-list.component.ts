import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { SchoolService } from '../../../data-access/school.service';
import { ListComponent } from '../../../../shared/ui/list/list.component';

@Component({
  selector: 'app-year-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './year-list.component.html',
  styleUrl: './year-list.component.scss'
})
export class YearListComponent {
  @Input({required: true}) courseId: string = '';
  @Input({required: true}) schoolId: string = '';
  @Output() selectYearEvent = new EventEmitter<string>();

  private schoolService = inject(SchoolService);

  items: {long:string, short:string, id:string}[] = [];
  heading: string = '';;

  async ngOnInit() {
    await this.schoolService.getCourse(this.schoolId, this.courseId).then((course) => {
      this.heading = `${course!['code']} past papers & solutions`;
      for (const [key, value] of Object.entries(course!['years'])) {
        this.items.push({long: key, short: key, id: value as string});
      }
    });
  }

  returnYearURL(url: string) {
    this.selectYearEvent.emit(url);
  }
}

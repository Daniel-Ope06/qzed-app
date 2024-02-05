import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ListComponent } from '../../../../shared/ui/list/list.component';
import { QuestionService } from '../../../data-access/question.service';

@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.scss'
})
export class SchoolListComponent implements OnInit {
  @Output() selectSchoolEvent = new EventEmitter<string>();
  private questionService = inject(QuestionService);
  items: {long:string, short:string, id:string}[] = [];
  heading: string = 'Select a university';

  async ngOnInit() {
    await this.questionService.getSchools().then((schools) => {
      for (let school of schools) {
        this.items.push({long: school['full_name'], short: school['short_name'], id: school['id']});
      }
    });
  }

  returnSchoolId(id: string) {
    this.selectSchoolEvent.emit(id);
  }
}

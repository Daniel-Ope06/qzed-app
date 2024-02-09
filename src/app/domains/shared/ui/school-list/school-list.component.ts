import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { SchoolService } from '../../../study/data-access/school.service';

@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './school-list.component.html',
  styleUrl: './school-list.component.scss'
})
export class SchoolListComponent implements OnInit {
  @Output() selectSchoolEvent = new EventEmitter<string>();
  private schoolService = inject(SchoolService);
  items: {long:string, short:string, id:string}[] = [];
  heading: string = 'Select a university';

  async ngOnInit() {
    await this.schoolService.getSchools().then((schools) => {
      for (let school of schools) {
        this.items.push({long: school['full_name'], short: school['short_name'], id: school['id']});
      }
    });
  }

  returnSchoolId(id: string) {
    this.selectSchoolEvent.emit(id);
  }
}

import { Component, Input } from '@angular/core';
import { DashboardComponent } from "../../feature/dashboard/dashboard.component";
import { HeaderComponent } from '../../feature/header/header.component';
import { MenuComponent } from '../../feature/menu/menu.component';

@Component({
    selector: 'study-page',
    standalone: true,
    templateUrl: './study-page.component.html',
    styleUrl: './study-page.component.scss',
    imports: [DashboardComponent, HeaderComponent, MenuComponent]
})
export class StudyPageComponent {
  @Input() uid: string = '';
  title: string = 'Question Bank';

  receiveTab(tabTitle: string) {
    this.title = tabTitle;
  }
}
